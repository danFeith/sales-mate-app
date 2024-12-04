import React, { useEffect, useRef } from 'react';
import './ChatbotMessages.css';

interface ChatbotMessagesProps {
  messages: { type: string; text: string; isButton?: boolean }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMessages: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  handleSendMessage: (text: string) => void; // Add the handler prop
}

const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
  messages,
  isLoading,
  handleSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-messages">
      {messages.map((msg, index) =>
        msg.isButton ? (
          <button
            key={index}
            className="chatbot-special-button"
            onClick={() => handleSendMessage(msg.text)} // Send the button text as the message
          >
            {msg.text}
          </button>
        ) : (
          <div key={index} className={`chatbot-message ${msg.type}`}>
            {msg.text}
          </div>
        )
      )}
      {isLoading && <div className="chatbot-message bot">Typing...</div>}
      {/* Invisible div to ensure scrolling to the bottom */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatbotMessages;
