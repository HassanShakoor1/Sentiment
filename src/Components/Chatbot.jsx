import React, { useState, useRef, useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

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

  // Get user data from Redux store
  const userData = useSelector((state) => state.user);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContext = () => {
    if (!userProfile) return 'No profile data available.';

    console.log('Chatbot - User Profile Data:', userProfile); // Debug log
    console.log('Chatbot - Redux User Data:', userData); // Debug log

    const {
      firstName,
      lastName,
      birthDate = 'Not specified',
      deathDate = 'Not specified',
      bioInformation = 'Not specified',
      cemeteryName = 'Not specified',
      cemeteryLocation = 'Not specified',
      cemeteryPlot = 'Not specified',
      cemeteryCity = 'Not specified',
      cemeteryState = 'Not specified',
      donationsUrl = 'Not specified',
      linkObituary = 'Not specified',
      linkTitle = 'Not specified',
      linkUrl = 'Not specified',
      linkThumbnail = 'Not specified',
      city = 'Not specified',
      state = 'Not specified',
      timeline = {}
    } = userProfile;

    const ownerName = userData?.firstName && userData?.lastName 
      ? `${userData.firstName} ${userData.lastName}`
      : 'Not specified';

    const name = `${firstName} ${lastName}`;

    // Format timeline events
    const timelineEvents = Object.values(timeline || {}).map(event => ({
      date: event.timelineDate || 'Not specified',
      title: event.timelineTitle || 'Not specified',
      image: event.timelineImage || 'Not specified'
    }));

    const context = [
      'You are a memorial profile assistant.',
      'ONLY use the data below to answer. Do NOT add, infer, or guess any other information.',
      '',
      'PROFILE OWNER:',
      `Owner: ${ownerName}`,
      '',
      'PROFILE DATA:',
      `Name: ${name}`,
      `Birth Date: ${birthDate}`,
      `Death Date: ${deathDate}`,
      `Bio: ${bioInformation}`,
      '',
      'LOCATION INFORMATION:',
      'Before Death:',
      `City: ${city}`,
      `State: ${state}`,
      '',
      'After Death:',
      `Cemetery Name: ${cemeteryName}`,
      `Cemetery Location: ${cemeteryLocation}`,
      `Cemetery City: ${cemeteryCity}`,
      `Cemetery State: ${cemeteryState}`,
      `Cemetery Plot Number: ${cemeteryPlot}`,
      `Donation URL: ${donationsUrl}`,
      `Obituary Link: ${linkObituary}`,
      `Custom Link Title: ${linkTitle}`,
      `Custom Link URL: ${linkUrl}`,
      '',
      'TIMELINE EVENTS:',
      ...timelineEvents.map(event => 
        `Event: ${event.title} | Date: ${event.date}`
      ),
      '',
      'RESPONSE RULES:',
      '- If asked about anything not in PROFILE DATA, LOCATION INFORMATION, or TIMELINE EVENTS, say "I don\'t have information about that in the profile."',
      '- Do NOT mention any other names, people, dates, events, or places.',
      '- Answer in one short paragraph, using only the literal text from PROFILE DATA, LOCATION INFORMATION, and TIMELINE EVENTS.',
      '- When asked about location information, provide the specific details from the LOCATION INFORMATION section.',
      '- For questions about where they lived, use the "Before Death" location information.',
      '- For questions about burial/cemetery, use the "After Death" location information.',
      '- When asked about timeline events, provide the specific event details including date and title.',
      '- When asked about the profile owner, provide the name from the PROFILE OWNER section.',
      '- When asked about cemetery location links, provide the cemetery name and location with any available links.',
      '- Do not combine or infer information that is not explicitly provided in the data.',
    ].join('\n');

    console.log('Chatbot - Generated Context:', context); // Debug log
    return context;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    // Check if API key is available
    if (!import.meta.env.VITE_COHERE_API_KEY) {
      setError('API key is not configured. Please check your environment variables.');
      setIsTyping(false);
      return;
    }

    try {
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
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your environment variables in the hosting platform.');
        }
        throw new Error(errorData.message || 'Failed to get response from AI service');
      }

      const data = await response.json();
      let botResponse = data.text;

      const ownerName = userData?.firstName && userData?.lastName 
        ? `${userData.firstName} ${userData.lastName}`
        : 'Not specified';

      // Updated whitelist to include owner-related terms
      const whitelist = [
        userProfile.firstName,
        userProfile.lastName,
        userProfile.birthDate,
        userProfile.deathDate,
        userProfile.bioInformation,
        userProfile.cemeteryName,
        userProfile.cemeteryLocation,
        userProfile.cemeteryCity,
        userProfile.cemeteryState,
        userProfile.cemeteryPlot,
        userProfile.donationsUrl,
        userProfile.linkObituary,
        userProfile.linkTitle,
        userProfile.linkUrl,
        userProfile.city,
        userProfile.state,
        userData?.firstName,
        userData?.lastName,
        'cemetery',
        'burial',
        'grave',
        'plot',
        'location',
        'address',
        'city',
        'state',
        'lived',
        'resided',
        'residence',
        'home',
        'timeline',
        'event',
        'events',
        'date',
        'time',
        'history',
        'life',
        'story',
        'owner',
        'created',
        'profile',
        'link',
        'url',
        'map',
        'location'
      ].filter(Boolean);

      // Add timeline event titles and dates to whitelist
      if (userProfile.timeline) {
        Object.values(userProfile.timeline).forEach(event => {
          if (event.timelineTitle) whitelist.push(event.timelineTitle);
          if (event.timelineDate) whitelist.push(event.timelineDate);
        });
      }

      console.log('Chatbot - Whitelist:', whitelist); // Debug log

      const hasAllowed = whitelist.some(item => 
        botResponse.toLowerCase().includes(item?.toLowerCase() || '')
      );
      
      if (!hasAllowed) {
        botResponse = `I can only provide information about ${userProfile.firstName} ${userProfile.lastName} based on the available profile data.`;
      }

      // Handle burial location queries specifically
      if (userMessage.toLowerCase().includes('buried') || 
          userMessage.toLowerCase().includes('burial') ||
          userMessage.toLowerCase().includes('after death') ||
          userMessage.toLowerCase().includes('where he buried')) {
        if (userProfile.cemeteryCity && userProfile.cemeteryState) {
          botResponse = `${userProfile.firstName} is buried at ${userProfile.cemeteryName} in ${userProfile.cemeteryCity}, ${userProfile.cemeteryState}.`;
        } else if (userProfile.cemeteryLocation) {
          botResponse = `${userProfile.firstName} is buried at ${userProfile.cemeteryName} in ${userProfile.cemeteryLocation}.`;
        } else {
          botResponse = `${userProfile.firstName} is buried at ${userProfile.cemeteryName}.`;
        }
      }

      // Handle living location queries
      if (userMessage.toLowerCase().includes('lived') || 
          userMessage.toLowerCase().includes('resided') ||
          userMessage.toLowerCase().includes('where he lived') ||
          userMessage.toLowerCase().includes('where he resided')) {
        botResponse = `${userProfile.firstName} lived in ${userProfile.city}, ${userProfile.state}.`;
      }

      // Handle cemetery location link queries
      if (userMessage.toLowerCase().includes('cemetery') && 
          (userMessage.toLowerCase().includes('link') || 
           userMessage.toLowerCase().includes('location') ||
           userMessage.toLowerCase().includes('map'))) {
        let responseText = `${userProfile.firstName} is buried at ${userProfile.cemeteryName}`;
        
        if (userProfile.cemeteryCity && userProfile.cemeteryState) {
          responseText += ` in ${userProfile.cemeteryCity}, ${userProfile.cemeteryState}`;
        } else if (userProfile.cemeteryLocation) {
          responseText += ` in ${userProfile.cemeteryLocation}`;
        }
        
        if (userProfile.linkUrl) {
          responseText += `. You can find more information here: ${userProfile.linkUrl}`;
        }
        
        botResponse = responseText;
      }

      // Handle donation link queries
      if (userMessage.toLowerCase().includes('donation') || 
          userMessage.toLowerCase().includes('donate')) {
        if (userProfile.donationsUrl) {
          botResponse = `You can make donations in ${userProfile.firstName}'s honor at: ${userProfile.donationsUrl}`;
        } else {
          botResponse = `I don't have a donation link available for ${userProfile.firstName}.`;
        }
      }

      // Handle owner-specific queries
      if (userMessage.toLowerCase().includes('owner') || 
          userMessage.toLowerCase().includes('who created') ||
          userMessage.toLowerCase().includes('who made')) {
        if (ownerName !== 'Not specified') {
          botResponse = `This profile is owned by ${ownerName}.`;
        } else {
          botResponse = `I don't have information about the profile owner.`;
        }
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setMessages(prev => [
        ...prev,
        {
          text: `I can only provide information about ${userProfile.firstName} ${userProfile.lastName} based on the available profile data.`,
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