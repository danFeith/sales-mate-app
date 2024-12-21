import React from "react";
import ChatLogo from "../../assets/button-logo.svg";
import "./ChatbotButton.css";

interface ChatbotButtonProps {
  onClick: () => void;
  buttonRef: React.RefObject<HTMLDivElement>;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({
  onClick,
  buttonRef,
}) => {
  return (
    <div ref={buttonRef} className="chatbot-button" onClick={onClick}>
      <img src={ChatLogo} alt="Chatbot Logo" className="chatbot-button-icon" />
    </div>
  );
};

export default ChatbotButton;
