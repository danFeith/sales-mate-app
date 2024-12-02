import React from 'react';
import ChatIcon from '../../assets/chat-default-icon.svg'
import './ChatbotHeader.css';

interface ChatbotHeaderProps {
  onClose: () => void;
}

const ChatbotHeader: React.FC<ChatbotHeaderProps> = ({ onClose }) => {
  return (
    <div>
      {/* Header Section */}
      <div className="chatbot-modal-header">
        <button className="chatbot-back-button" onClick={onClose}>
          ←
        </button>
        <div className="chatbot-header-center">
          <span className="chatbot-status-dot"></span>
          <span className="chatbot-header-title">AI Chatbot</span>
        </div>
        <button className="chatbot-options-button">⋮</button>
      </div>

      {/* Circular Logo */}
      <div className="chatbot-logo-container">
        <img src={ChatIcon} alt="Chatbot Logo" className="chatbot-logo" width={30} />
      </div>
    </div>
  );
};

export default ChatbotHeader;
