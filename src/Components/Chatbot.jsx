import React, { useState, useRef, useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { ClipLoader } from 'react-spinners';

export default function Chatbot({ userProfile, isActive }) {
  const [messages, setMessages] = useState([
    {
      text: userProfile ? 
        `I can only provide information about ${userProfile.firstName} ${userProfile.lastName} based on the available profile data. What would you like to know?` :
        'No profile data available.',
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateContext = () => {
    if (!userProfile) {
      return 'No profile data available.';
    }

    // Validate required profile data
    if (!userProfile.firstName || !userProfile.lastName) {
      return 'Invalid profile data: Missing name information.';
    }

    const profileInfo = {
      name: `${userProfile.firstName} ${userProfile.lastName}`,
      birthDate: userProfile.birthDate || 'Not specified',
      deathDate: userProfile.deathDate || 'Not specified',
      bio: userProfile.bioInformation || 'Not specified',
      cemetery: userProfile.cemeteryName || 'Not specified',
      location: userProfile.cemeteryLocation || 'Not specified',
      plot: userProfile.cemeteryPlot || 'Not specified'
    };

    return `You are a memorial profile assistant. Your ONLY purpose is to provide information about ${profileInfo.name} using ONLY the following data:

    PROFILE DATA:
    Name: ${profileInfo.name}
    Birth Date: ${profileInfo.birthDate}
    Death Date: ${profileInfo.deathDate}
    Biography: ${profileInfo.bio}
    Cemetery: ${profileInfo.cemetery}
    Location: ${profileInfo.location}
    Plot: ${profileInfo.plot}

    RESPONSE RULES:
    1. ONLY use the information provided in the PROFILE DATA section above.
    2. If asked about ANYTHING not in the PROFILE DATA, respond with: "I can only provide information about ${profileInfo.name} based on the available profile data."
    3. If asked about ANY other person, respond with: "I can only provide information about ${profileInfo.name} based on the available profile data."
    4. If asked about dates not in the PROFILE DATA, respond with: "I don't have that date information in the profile data."
    5. If asked about events not in the PROFILE DATA, respond with: "I don't have information about that event in the profile data."
    6. If asked about places not in the PROFILE DATA, respond with: "I don't have information about that location in the profile data."
    7. If asked about people not in the PROFILE DATA, respond with: "I can only provide information about ${profileInfo.name} based on the available profile data."
    8. DO NOT provide any information not explicitly listed in the PROFILE DATA.
    9. DO NOT make up, guess, or infer any information.
    10. DO NOT mention any names other than ${profileInfo.name}.
    11. DO NOT provide any historical context or background information.
    12. DO NOT discuss or compare with other people or events.
    13. DO NOT suggest learning about other topics or people.
    14. DO NOT provide any additional explanations or context.
    15. DO NOT use any external knowledge or information.`;
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isTyping) return;

    // Add user message
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          model: 'command',
          temperature: 0.0, // Zero temperature for maximum determinism
          chat_history: messages.map(msg => ({
            role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
            message: msg.text
          })),
          prompt_truncation: 'AUTO',
          system_prompt: generateContext()
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get response from AI service');
      }

      const data = await response.json();
      let botResponse = data.text;

      // Force response to only contain profile information
      if (!botResponse.includes(userProfile.firstName) || 
          !botResponse.includes(userProfile.lastName) || 
          botResponse.includes('Hassan') || 
          botResponse.includes('Shakoor')) {
        botResponse = `I can only provide information about ${userProfile.firstName} ${userProfile.lastName} based on the available profile data.`;
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      setMessages(prev => [...prev, { 
        text: `I can only provide information about ${userProfile.firstName} ${userProfile.lastName} based on the available profile data.`, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isActive) return null;

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
        {messages.map((message, index) => (
          <div
            key={index}
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

      {error && (
        <div className="text-red-500 text-sm mb-2">
          {error}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
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