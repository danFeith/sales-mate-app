import React from 'react';
import ChatLogo from '../../assets/chat-default-icon.svg';
import './ChatbotButton.css';

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
  return (
    <div className="chatbot-button" onClick={onClick}>
      <img src={ChatLogo} alt="Chatbot Logo" className="chatbot-button-icon" />
    </div>
  );
};

export default ChatbotButton;
