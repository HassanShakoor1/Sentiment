import React, { useState, useRef, useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { ClipLoader } from 'react-spinners';
import { ref, get } from 'firebase/database';
import { db } from '../Firebase/firebaseConfig';

export default function Chatbot({ userProfile, isActive }) {
  const [messages, setMessages] = useState([
    {
      text: userProfile
        ? `I can only provide information about ${userProfile.firstName} ${userProfile.lastName} based on the available profile data. What would you like to know?`
        : 'No profile data available.',
      sender: 'bot',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const [username, setUsername] = useState('Not specified');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const currentUser = localStorage.getItem("userId");
        if (currentUser) {
          const userRef = ref(db, `User/${currentUser}`);
          const userSnapshot = await get(userRef);
          const userData = userSnapshot.val();
          if (userData?.userName) {
            // Extract just the name part from the username (remove the ID part)
            const namePart = userData.userName.split(currentUser)[0];
            setUsername(namePart || 'Not specified');
          }
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContext = () => {
    if (!userProfile) return 'No profile data available.';

    const {
      firstName,
      lastName,
      birthDate = 'Not specified',
      deathDate = 'Not specified',
      bioInformation = 'Not specified',
      cemeteryName = 'Not specified',
      cemeteryLocation = 'Not specified',
      cemeteryPlot = 'Not specified',
      cemeteryState = 'Not specified',
      cemeteryCity = 'Not specified',
      city = 'Not specified',
      state = 'Not specified',
      timeline = {},
    } = userProfile;

    const name = `${firstName} ${lastName}`;
    
    // Format timeline events
    let timelineEvents = [];
    if (timeline && typeof timeline === 'object') {
      try {
        const timelineArray = Array.isArray(timeline) ? timeline : Object.values(timeline);
        timelineEvents = timelineArray
          .filter(event => event && event.timelineDate && event.timelineTitle)
          .map(event => {
            // Format date to remove time portion
            const date = new Date(event.timelineDate);
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            return {
              date: formattedDate,
              title: event.timelineTitle,
              image: event.timelineImage
            };
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));
      } catch (error) {
        console.error('Error processing timeline:', error);
      }
    }

    return [
      'You are a memorial profile assistant.',
      'ONLY use the data below to answer. Do NOT add, infer, or guess any other information.',
      '',
      'PROFILE DATA:',
      `Name: ${name}`,
      `Birth Date: ${birthDate}`,
      `Death Date: ${deathDate}`,
      `Bio: ${bioInformation}`,
      `Cemetery: ${cemeteryName}`,
      `Cemetery Location: ${cemeteryLocation}`,
      `Cemetery Plot: ${cemeteryPlot}`,
      `Cemetery State: ${cemeteryState}`,
      `Cemetery City: ${cemeteryCity}`,
      `Location Before Death - City: ${city}`,
      `Location Before Death - State: ${state}`,
      '',
      'TIMELINE EVENTS:',
      ...(timelineEvents.length > 0 
        ? timelineEvents.map(event => `- ${event.date}: ${event.title}`)
        : ['No timeline events available']),
      '',
      'RESPONSE RULES:',
      '- ONLY state the exact information requested',
      '- Do NOT add any explanatory text or disclaimers',
      '- If information is not available, respond with "Not specified"',
      '- Keep responses brief and direct',
      '- Do NOT mention what information you do or do not have access to',
      '- When asked about timeline events, list them chronologically',
      '- If asked about specific timeline events, provide the exact date and title',
    ].join('\n');
  };

  const calculateAge = (birthDate, deathDate) => {
    if (!birthDate || !deathDate) return 'Not specified';
    
    const birth = new Date(birthDate);
    const death = new Date(deathDate);
    
    if (isNaN(birth.getTime()) || isNaN(death.getTime())) return 'Not specified';
    
    const diffTime = Math.abs(death - birth);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365.25);
    
    return diffYears;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim().toLowerCase();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Get current user's data from Firebase
      const currentUser = localStorage.getItem("userId");
      const userRef = ref(db, `User/${currentUser}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();
      
      // Extract just the name part from the username (remove the ID part)
      const fullUsername = userData?.userName || '';
      const userName = fullUsername.split(currentUser)[0] || 'Not specified';

      // Get profile data from Firebase
      const profileRef = ref(db, `Profile/${userProfile.id}`);
      const profileSnapshot = await get(profileRef);
      const firebaseProfileData = profileSnapshot.val();

      // Check for cemetery city queries
      if (userMessage.includes('cemetery city') || userMessage.includes('city after death')) {
        const cemeteryCity = firebaseProfileData?.cemeteryCity || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `Cemetery City: ${cemeteryCity}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for cemetery state queries
      if (userMessage.includes('cemetery state') || userMessage.includes('state after death')) {
        const cemeteryState = firebaseProfileData?.cemeteryState || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `Cemetery State: ${cemeteryState}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for location before death state queries
      if (userMessage.includes('state before death') || userMessage.includes('where was the state')) {
        const state = firebaseProfileData?.state || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `State Before Death: ${state}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for general state queries
      if (userMessage.includes('state') || userMessage.includes('location')) {
        const cemeteryState = firebaseProfileData?.cemeteryState || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `Cemetery State: ${cemeteryState}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for location before death queries
      if (userMessage.includes('location before death') || userMessage.includes('where did they live')) {
        const city = firebaseProfileData?.city || 'Not specified';
        const state = firebaseProfileData?.state || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `Location Before Death:\nCity: ${city}\nState: ${state}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for location before death city queries
      if (userMessage.includes('city before death') || userMessage.includes('where was the city')) {
        const city = firebaseProfileData?.city || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `City Before Death: ${city}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for owner/profile related queries
      if (userMessage.includes('owner') || userMessage.includes('who owns') || userMessage.includes('who created')) {
        setMessages(prev => [...prev, { 
          text: `Profile Owner: ${userName}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for age-related queries
      if (userMessage.includes('age') || userMessage.includes('how old')) {
        const age = calculateAge(userProfile.birthDate, userProfile.deathDate);
        if (age !== 'Not specified') {
          setMessages(prev => [...prev, { 
            text: `Age at time of death: ${age} years`, 
            sender: 'bot' 
          }]);
          setIsTyping(false);
          return;
        }
      }

      // Check if the query is about timeline
      const timelineKeywords = ['timeline', 'event', 'events', 'achievement', 'award', 'employee of the month'];
      const isTimelineQuery = timelineKeywords.some(keyword => 
        userMessage.includes(keyword)
      );

      if (isTimelineQuery) {
        const { timeline = {} } = userProfile;
        const timelineArray = Array.isArray(timeline) ? timeline : Object.values(timeline);
        
        if (timelineArray.length > 0) {
          const sortedEvents = timelineArray
            .filter(event => event && event.timelineDate && event.timelineTitle)
            .sort((a, b) => new Date(a.timelineDate) - new Date(b.timelineDate));

          if (sortedEvents.length > 0) {
            const botResponse = sortedEvents
              .map(event => `${event.timelineDate}: ${event.timelineTitle}`)
              .join('\n');
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
            setIsTyping(false);
            return;
          }
        }
        setMessages(prev => [...prev, { text: "No timeline events are available in the profile.", sender: 'bot' }]);
        setIsTyping(false);
        return;
      }

      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'command',
          preamble: generateContext(),
          chat_history: messages.map(msg => ({
            role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
            message: msg.text,
          })),
          message: userMessage,
          temperature: 0.0,
          prompt_truncation: 'AUTO',
          stop_sequences: ['USER:', 'CHATBOT:'],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get response from AI service');
      }

      const data = await response.json();
      let botResponse = data.text;

      // Check if the response contains any profile data
      const profileData = [
        userProfile.firstName,
        userProfile.lastName,
        userProfile.birthDate,
        userProfile.deathDate,
        userProfile.bioInformation,
        userProfile.cemeteryName,
        userProfile.cemeteryLocation,
        userProfile.cemeteryPlot,
      ].filter(Boolean);

      const hasProfileData = profileData.some(item => botResponse.includes(item));
      
      if (!hasProfileData) {
        if (userMessage.includes('birth')) {
          botResponse = `Birth Date: ${userProfile.birthDate || 'Not specified'}`;
        } else if (userMessage.includes('death')) {
          botResponse = `Death Date: ${userProfile.deathDate || 'Not specified'}`;
        } else if (userMessage.includes('cemetery')) {
          botResponse = `Cemetery: ${userProfile.cemeteryName || 'Not specified'}\nLocation: ${userProfile.cemeteryLocation || 'Not specified'}\nPlot: ${userProfile.cemeteryPlot || 'Not specified'}`;
        } else if (userMessage.includes('bio')) {
          botResponse = `Bio: ${userProfile.bioInformation || 'Not specified'}`;
        } else {
          botResponse = "I don't have that specific information in the profile.";
        }
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setMessages(prev => [
        ...prev,
        {
          text: "I'm sorry, I encountered an error. Please try again.",
          sender: 'bot',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isActive) return null;

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <ClipLoader size={20} color="#4B5563" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isTyping}
        />
        <button
          onClick={handleSendMessage}
          disabled={isTyping || !inputMessage.trim()}
          className={`p-2 rounded-lg ${
            isTyping || !inputMessage.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          <RiSendPlaneFill size={20} />
        </button>
      </div>
    </div>
  );
}