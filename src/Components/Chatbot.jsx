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

      // Check for birthday queries
      if (userMessage.includes('birth') || userMessage.includes('birthday') || userMessage.includes('born')) {
        const birthDate = firebaseProfileData?.birthDate || 'Not specified';
        if (birthDate !== 'Not specified') {
          // Format date based on the type of query
          const date = new Date(birthDate);
          let formattedDate;
          
          if (userMessage.includes('when') && (userMessage.includes('born') || userMessage.includes('birth'))) {
            // Include year for "when born" queries
            formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          } else {
            // Show only month and day for general birthday queries
            formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            });
          }
          
          setMessages(prev => [...prev, { 
            text: `Birth Date: ${formattedDate}`, 
            sender: 'bot' 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            text: `Birth Date: Not specified`, 
            sender: 'bot' 
          }]);
        }
        setIsTyping(false);
        return;
      }

      // Check for timeline queries
      if (userMessage.includes('timeline') || userMessage.includes('event') || 
          userMessage.includes('achievement') || userMessage.includes('award') ||
          userMessage.includes('employee') || userMessage.includes('month') ||
          userMessage.includes('education') || userMessage.includes('complete') ||
          userMessage.includes('fyp') || userMessage.includes('graduation') ||
          userMessage.includes('job') || userMessage.includes('work') ||
          userMessage.includes('start') || userMessage.includes('career') ||
          userMessage.includes('tour') || userMessage.includes('travel') ||
          userMessage.includes('visit') || userMessage.includes('trip')) {
        try {
          // Get fresh timeline data from Firebase
          const timelineRef = ref(db, `Profile/${userProfile.id}/timeline`);
          const timelineSnapshot = await get(timelineRef);
          const timelineData = timelineSnapshot.val() || {};

          // Convert timeline data to array and ensure proper structure
          let timelineArray = [];
          if (Array.isArray(timelineData)) {
            timelineArray = timelineData;
          } else if (typeof timelineData === 'object' && timelineData !== null) {
            // Handle both object with numeric keys and object with string keys
            timelineArray = Object.entries(timelineData).map(([key, value]) => {
              // If the value is already an object with timeline properties, use it as is
              if (value && typeof value === 'object' && 'timelineDate' in value) {
                return value;
              }
              // Otherwise, use the key as the ID and the value as the event data
              return {
                id: key,
                ...value
              };
            });
          }

          // Filter and sort events
          const sortedEvents = timelineArray
            .filter(event => {
              // Validate required fields
              if (!event || typeof event !== 'object') return false;
              
              // Check for both possible date field names
              const date = event.timelineDate || event.date;
              const title = event.timelineTitle || event.title;
              
              if (!date || !title) return false;
              
              // Validate date format
              const parsedDate = new Date(date);
              return !isNaN(parsedDate.getTime());
            })
            .map(event => ({
              // Normalize event structure
              timelineDate: event.timelineDate || event.date,
              timelineTitle: event.timelineTitle || event.title,
              timelineImage: event.timelineImage || event.image
            }))
            .sort((a, b) => {
              const dateA = new Date(a.timelineDate);
              const dateB = new Date(b.timelineDate);
              return dateA - dateB;
            });

          if (sortedEvents.length > 0) {
            // Check for specific event queries
            if (userMessage.includes('tour') || userMessage.includes('travel') || 
                userMessage.includes('visit') || userMessage.includes('trip')) {
              const tourEvent = sortedEvents.find(event => {
                const title = event.timelineTitle.toLowerCase();
                return title.includes('tour') || 
                       title.includes('travel') ||
                       title.includes('visit') ||
                       title.includes('trip') ||
                       title.includes('went to') ||
                       title.includes('visited');
              });
              
              if (tourEvent) {
                const date = new Date(tourEvent.timelineDate);
                const formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                setMessages(prev => [...prev, { 
                  text: `He went on a tour on ${formattedDate}: ${tourEvent.timelineTitle}`, 
                  sender: 'bot' 
                }]);
              } else {
                setMessages(prev => [...prev, { 
                  text: "I couldn't find specific information about his tour.", 
                  sender: 'bot' 
                }]);
              }
            } else if (userMessage.includes('job') || userMessage.includes('work') || 
                userMessage.includes('start') || userMessage.includes('career')) {
              const jobEvent = sortedEvents.find(event => {
                const title = event.timelineTitle.toLowerCase();
                return title.includes('job') || 
                       title.includes('work') ||
                       title.includes('career') ||
                       title.includes('employee') ||
                       title.includes('start');
              });
              
              if (jobEvent) {
                const date = new Date(jobEvent.timelineDate);
                const formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                setMessages(prev => [...prev, { 
                  text: `He started his new job on ${formattedDate}: ${jobEvent.timelineTitle}`, 
                  sender: 'bot' 
                }]);
              } else {
                setMessages(prev => [...prev, { 
                  text: "I couldn't find specific information about when he started his job.", 
                  sender: 'bot' 
                }]);
              }
            } else if (userMessage.includes('fyp')) {
              const fypEvent = sortedEvents.find(event => 
                event.timelineTitle.toLowerCase().includes('fyp')
              );
              
              if (fypEvent) {
                const date = new Date(fypEvent.timelineDate);
                const formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                setMessages(prev => [...prev, { 
                  text: `He completed his FYP on ${formattedDate}: ${fypEvent.timelineTitle}`, 
                  sender: 'bot' 
                }]);
              } else {
                setMessages(prev => [...prev, { 
                  text: "I couldn't find specific information about the FYP completion.", 
                  sender: 'bot' 
                }]);
              }
            } else if (userMessage.includes('education') || userMessage.includes('complete') || 
                userMessage.includes('graduation')) {
              const educationEvent = sortedEvents.find(event => {
                const title = event.timelineTitle.toLowerCase();
                return title.includes('education') || 
                       title.includes('complete') ||
                       title.includes('graduation');
              });
              
              if (educationEvent) {
                const date = new Date(educationEvent.timelineDate);
                const formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                setMessages(prev => [...prev, { 
                  text: `He completed his education on ${formattedDate}: ${educationEvent.timelineTitle}`, 
                  sender: 'bot' 
                }]);
              } else {
                setMessages(prev => [...prev, { 
                  text: "I couldn't find specific information about the education completion.", 
                  sender: 'bot' 
                }]);
              }
            } else if (userMessage.includes('employee') || userMessage.includes('month')) {
              const employeeEvent = sortedEvents.find(event => {
                const title = event.timelineTitle.toLowerCase();
                return title.includes('employee') || 
                       title.includes('month');
              });
              
              if (employeeEvent) {
                const date = new Date(employeeEvent.timelineDate);
                const formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                setMessages(prev => [...prev, { 
                  text: `He received Employee of the Month on ${formattedDate}: ${employeeEvent.timelineTitle}`, 
                  sender: 'bot' 
                }]);
              } else {
                setMessages(prev => [...prev, { 
                  text: "I couldn't find specific information about the Employee of the Month award.", 
                  sender: 'bot' 
                }]);
              }
            } else {
              // Show all timeline events
              const botResponse = sortedEvents
                .map(event => {
                  const date = new Date(event.timelineDate);
                  const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  return `${formattedDate}\n${event.timelineTitle}`;
                })
                .join('\n\n');
              setMessages(prev => [...prev, { 
                text: `SIGNIFICANT EVENTS\n\n${botResponse}`, 
                sender: 'bot' 
              }]);
            }
          } else {
            setMessages(prev => [...prev, { text: "No timeline events are available in the profile.", sender: 'bot' }]);
          }
        } catch (error) {
          console.error('Error fetching timeline data:', error);
          setMessages(prev => [...prev, { text: "Error accessing timeline data. Please try again.", sender: 'bot' }]);
        }
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

      // Check for cemetery name queries
      if (userMessage.includes('cemetery name') || userMessage.includes('cemetery')) {
        const cemeteryName = firebaseProfileData?.cemeteryName || 'Not specified';
        const cemeteryLocation = firebaseProfileData?.cemeteryLocation || 'Not specified';
        const cemeteryPlot = firebaseProfileData?.cemeteryPlot || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `Cemetery Name: ${cemeteryName}\nLocation: ${cemeteryLocation}\nPlot: ${cemeteryPlot}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      // Check for deceased person's name queries
      if (userMessage.includes('name') || userMessage.includes('who is') || userMessage.includes('person')) {
        const firstName = firebaseProfileData?.firstName || 'Not specified';
        const lastName = firebaseProfileData?.lastName || 'Not specified';
        setMessages(prev => [...prev, { 
          text: `Name: ${firstName} ${lastName}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

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

      // Check for age-related queries
      if (userMessage.includes('age') || userMessage.includes('how old')) {
        const age = calculateAge(firebaseProfileData?.birthDate, firebaseProfileData?.deathDate);
        if (age !== 'Not specified') {
          setMessages(prev => [...prev, { 
            text: `Age at time of death: ${age} years`, 
            sender: 'bot' 
          }]);
          setIsTyping(false);
          return;
        }
      }

      // Check for city queries
      if (userMessage.includes('city') || userMessage.includes('location') || 
          userMessage.includes('where') || userMessage.includes('live')) {
        try {
          // Get fresh profile data from Firebase
          const profileRef = ref(db, `Profile/${userProfile.id}`);
          const profileSnapshot = await get(profileRef);
          const firebaseProfileData = profileSnapshot.val() || {};

          // Check if it's a cemetery city query
          if (userMessage.includes('cemetery') || userMessage.includes('after death')) {
            const cemeteryCity = firebaseProfileData?.cemeteryCity || 'Not specified';
            setMessages(prev => [...prev, { 
              text: `Cemetery City: ${cemeteryCity}`, 
              sender: 'bot' 
            }]);
          } else {
            // Handle city before death query
            const city = firebaseProfileData?.city || 'Not specified';
            setMessages(prev => [...prev, { 
              text: `City Before Death: ${city}`, 
              sender: 'bot' 
            }]);
          }
          setIsTyping(false);
          return;
        } catch (error) {
          console.error('Error fetching city data:', error);
          setMessages(prev => [...prev, { text: "Error accessing city information. Please try again.", sender: 'bot' }]);
        }
        setIsTyping(false);
        return;
      }

      // Check for death date queries
      if (userMessage.includes('death') || userMessage.includes('passed') || 
          userMessage.includes('died') || userMessage.includes('deceased')) {
        try {
          // Get fresh profile data from Firebase
          const profileRef = ref(db, `Profile/${userProfile.id}`);
          const profileSnapshot = await get(profileRef);
          const firebaseProfileData = profileSnapshot.val() || {};

          const deathDate = firebaseProfileData?.deathDate || 'Not specified';
          if (deathDate !== 'Not specified') {
            const date = new Date(deathDate);
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            setMessages(prev => [...prev, { 
              text: `Death Date: ${formattedDate}`, 
              sender: 'bot' 
            }]);
          } else {
            setMessages(prev => [...prev, { 
              text: "Death date is not specified in the profile.", 
              sender: 'bot' 
            }]);
          }
          setIsTyping(false);
          return;
        } catch (error) {
          console.error('Error fetching death date:', error);
          setMessages(prev => [...prev, { text: "Error accessing death date. Please try again.", sender: 'bot' }]);
        }
        setIsTyping(false);
        return;
      }

      // Check for donation queries
      if (userMessage.includes('donation') || userMessage.includes('donate') || 
          userMessage.includes('contribute') || userMessage.includes('fund') ||
          userMessage.includes('link') || userMessage.includes('payment')) {
        try {
          // Get fresh profile data from Firebase
          const profileRef = ref(db, `Profile/${userProfile.id}`);
          const profileSnapshot = await get(profileRef);
          const firebaseProfileData = profileSnapshot.val() || {};

          // Check for donation link using the correct field name
          const donationLink = firebaseProfileData?.donationsUrl || 'Not specified';

          if (donationLink !== 'Not specified') {
            // Get the person's name for a more personalized response
            const firstName = firebaseProfileData?.firstName || '';
            const lastName = firebaseProfileData?.lastName || '';
            const fullName = `${firstName} ${lastName}`.trim() || 'The person';

            setMessages(prev => [...prev, { 
              text: `${fullName}'s Donation Link: ${donationLink}`, 
              sender: 'bot' 
            }]);
          } else {
            setMessages(prev => [...prev, { 
              text: "No donation link is available in the profile.", 
              sender: 'bot' 
            }]);
          }
          setIsTyping(false);
          return;
        } catch (error) {
          console.error('Error fetching donation link:', error);
          setMessages(prev => [...prev, { text: "Error accessing donation information. Please try again.", sender: 'bot' }]);
        }
        setIsTyping(false);
        return;
      }

      // Check if Cohere API key is available
      const cohereApiKey = import.meta.env.VITE_COHERE_API_KEY;
      if (!cohereApiKey) {
        // If API key is not available, try to respond with profile data
        const firstName = firebaseProfileData?.firstName || 'Not specified';
        const lastName = firebaseProfileData?.lastName || 'Not specified';
        const birthDate = firebaseProfileData?.birthDate || 'Not specified';
        const deathDate = firebaseProfileData?.deathDate || 'Not specified';
        const bio = firebaseProfileData?.bioInformation || 'Not specified';
        const cemeteryName = firebaseProfileData?.cemeteryName || 'Not specified';
        const cemeteryLocation = firebaseProfileData?.cemeteryLocation || 'Not specified';
        const cemeteryPlot = firebaseProfileData?.cemeteryPlot || 'Not specified';
        
        setMessages(prev => [...prev, { 
          text: `Name: ${firstName} ${lastName}\nBirth Date: ${birthDate}\nDeath Date: ${deathDate}\nBio: ${bio}\nCemetery: ${cemeteryName}\nLocation: ${cemeteryLocation}\nPlot: ${cemeteryPlot}`, 
          sender: 'bot' 
        }]);
        setIsTyping(false);
        return;
      }

      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cohereApiKey}`,
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
          // If API key is invalid, try to respond with profile data
          const firstName = firebaseProfileData?.firstName || 'Not specified';
          const lastName = firebaseProfileData?.lastName || 'Not specified';
          const birthDate = firebaseProfileData?.birthDate || 'Not specified';
          const deathDate = firebaseProfileData?.deathDate || 'Not specified';
          const bio = firebaseProfileData?.bioInformation || 'Not specified';
          const cemeteryName = firebaseProfileData?.cemeteryName || 'Not specified';
          const cemeteryLocation = firebaseProfileData?.cemeteryLocation || 'Not specified';
          const cemeteryPlot = firebaseProfileData?.cemeteryPlot || 'Not specified';
          
          setMessages(prev => [...prev, { 
            text: `Name: ${firstName} ${lastName}\nBirth Date: ${birthDate}\nDeath Date: ${deathDate}\nBio: ${bio}\nCemetery: ${cemeteryName}\nLocation: ${cemeteryLocation}\nPlot: ${cemeteryPlot}`, 
            sender: 'bot' 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            text: "I'm sorry, I encountered an error. Please try again later.", 
            sender: 'bot' 
          }]);
        }
        setIsTyping(false);
        return;
      }

      const data = await response.json();
      let botResponse = data.text;

      // Check if the response contains any profile data
      const profileData = [
        firebaseProfileData?.firstName,
        firebaseProfileData?.lastName,
        firebaseProfileData?.birthDate,
        firebaseProfileData?.deathDate,
        firebaseProfileData?.bioInformation,
        firebaseProfileData?.cemeteryName,
        firebaseProfileData?.cemeteryLocation,
        firebaseProfileData?.cemeteryPlot,
      ].filter(Boolean);

      const hasProfileData = profileData.some(item => botResponse.includes(item));
      
      if (!hasProfileData) {
        if (userMessage.includes('birth') || userMessage.includes('birthday') || userMessage.includes('born')) {
          const birthDate = firebaseProfileData?.birthDate || 'Not specified';
          if (birthDate !== 'Not specified') {
            // Format date based on the type of query
            const date = new Date(birthDate);
            let formattedDate;
            
            if (userMessage.includes('when') && (userMessage.includes('born') || userMessage.includes('birth'))) {
              // Include year for "when born" queries
              formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
            } else {
              // Show only month and day for general birthday queries
              formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              });
            }
            
            botResponse = `Birth Date: ${formattedDate}`;
          } else {
            botResponse = `Birth Date: Not specified`;
          }
        } else if (userMessage.includes('death')) {
          botResponse = `Death Date: ${firebaseProfileData?.deathDate || 'Not specified'}`;
        } else if (userMessage.includes('cemetery name') || userMessage.includes('cemetery')) {
          const cemeteryName = firebaseProfileData?.cemeteryName || 'Not specified';
          const cemeteryLocation = firebaseProfileData?.cemeteryLocation || 'Not specified';
          const cemeteryPlot = firebaseProfileData?.cemeteryPlot || 'Not specified';
          botResponse = `Cemetery Name: ${cemeteryName}\nLocation: ${cemeteryLocation}\nPlot: ${cemeteryPlot}`;
        } else if (userMessage.includes('cemetery state') || userMessage.includes('state after death')) {
          botResponse = `Cemetery State: ${firebaseProfileData?.cemeteryState || 'Not specified'}`;
        } else if (userMessage.includes('cemetery city') || userMessage.includes('city after death')) {
          botResponse = `Cemetery City: ${firebaseProfileData?.cemeteryCity || 'Not specified'}`;
        } else if (userMessage.includes('bio')) {
          botResponse = `Bio: ${firebaseProfileData?.bioInformation || 'Not specified'}`;
        } else if (userMessage.includes('owner') || userMessage.includes('who owns') || userMessage.includes('who created')) {
          botResponse = `Profile Owner: ${userName}`;
        } else if (userMessage.includes('timeline') || userMessage.includes('event') || userMessage.includes('achievement') || userMessage.includes('award')) {
          const timelineData = firebaseProfileData?.timeline || {};
          const timelineArray = Array.isArray(timelineData) ? timelineData : Object.values(timelineData);
          
          if (timelineArray.length > 0) {
            const sortedEvents = timelineArray
              .filter(event => event && event.timelineDate && event.timelineTitle)
              .sort((a, b) => new Date(a.timelineDate) - new Date(b.timelineDate));

            if (sortedEvents.length > 0) {
              botResponse = sortedEvents
                .map(event => `${event.timelineDate}: ${event.timelineTitle}`)
                .join('\n');
            } else {
              botResponse = "No timeline events are available in the profile.";
            }
          } else {
            botResponse = "No timeline events are available in the profile.";
          }
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
          text: "I'm sorry, I encountered an error. Please try again later.",
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