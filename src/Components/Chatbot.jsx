import React, { useState, useRef, useEffect } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { ClipLoader } from 'react-spinners';

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
    } = userProfile;

    const name = `${firstName} ${lastName}`;
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
      `Location: ${cemeteryLocation}`,
      `Plot: ${cemeteryPlot}`,
      '',
      'RESPONSE RULES:',
      '- ONLY state the exact information requested',
      '- Do NOT add any explanatory text or disclaimers',
      '- If information is not available, respond with "Not specified"',
      '- Keep responses brief and direct',
      '- Do NOT mention what information you do or do not have access to',
    ].join('\n');
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);
    setError(null);

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
        throw new Error(errorData.message || 'Failed to get response from AI service');
      }

      const data = await response.json();
      let botResponse = data.text;

      // Updated post-filter: require at least one whitelist match instead of all
      const whitelist = [
        userProfile.firstName,
        userProfile.lastName,
        userProfile.birthDate,
        userProfile.deathDate,
        userProfile.bioInformation,
        userProfile.cemeteryName,
        userProfile.cemeteryLocation,
        userProfile.cemeteryPlot,
      ].filter(Boolean);

      const hasAllowed = whitelist.some(item => botResponse.includes(item));
      if (!hasAllowed) {
        botResponse = `I can only provide information about ${userProfile.firstName} ${userProfile.lastName} based on the available profile data.`;
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