import React, { useEffect, useState } from 'react';
import ChatbotHeader from '../ChatbotHeader/ChatbotHeader';
import ChatbotMessages from '../ChatbotMessages/ChatbotMessages';
import ChatbotInput from '../ChatbotInput/ChatbotInput';
import './ChatbotModal.css';

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
      const response = await fetch(`https://shopify-openai-server.onrender.com/ask?query=${encodeURIComponent(text)}`);
      const data = await response.json();
      setMessages([...newMessages, { type: 'bot', text: data.answer }]);
    } catch {
      setMessages([...newMessages, { type: 'bot', text: 'Sorry, I could not fetch an answer. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-modal">
      <ChatbotHeader onClose={onClose} />
      {window.shopDomain}
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
