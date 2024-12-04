import React, { useEffect, useState } from 'react';
import ChatbotHeader from '../ChatbotHeader/ChatbotHeader';
import ChatbotMessages from '../ChatbotMessages/ChatbotMessages';
import ChatbotInput from '../ChatbotInput/ChatbotInput';
import './ChatbotModal.css';
import axios from 'axios';

interface ChatbotModalProps {
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'How can we help you today? 👋' },
    { type: 'bot', text: 'Chat With Human Instead', isButton: true },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shopId, setShopId] = useState('');

  useEffect(() => {
    // Extract the 'shop' parameter from the query string
    const params = new URLSearchParams(window.location.search);
    const shop = params.get('shop');
    if (shop) {
      setShopId(shop);
      console.log(shopId)
    }
  }, []);


  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
  
    const newMessages = [...messages, { type: 'user', text }];
    setMessages(newMessages);
    setIsLoading(true);
    
    try {
      // Define the request payload
      const payload = {
        user_message: text,
        shop_domain: window.shopDomain,
      };
  
      // Make the POST request with axios
      const response = await axios.post(
        'https://eccomerce-virtual-assistant.onrender.com/chat',
        payload
      );
  
      // Extract model_reply from the response
      const { model_reply } = response.data;
  
      // Update messages with the bot's reply
      setMessages([...newMessages, { type: 'bot', text: model_reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { type: 'bot', text: 'Sorry, I could not fetch an answer. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-modal">
      <ChatbotHeader onClose={onClose} />
      <ChatbotMessages
        messages={messages}
        setMessages={setMessages}
        isLoading={isLoading}
        handleSendMessage={handleSendMessage} // Pass the handler to messages
      />
      <ChatbotInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSendMessage={() => handleSendMessage(userInput)}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatbotModal;
