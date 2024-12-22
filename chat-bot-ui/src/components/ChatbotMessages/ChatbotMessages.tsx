import React, { useEffect } from "react";
import "./ChatbotMessages.css";
import { Message } from "../../types";
import { ProductMessage } from "./ProductRecommendation/ProductRecommendation";

interface ChatbotMessagesProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  handleSendMessage: (text: string) => void;
}

const ChatbotMessages: React.FC<ChatbotMessagesProps> = ({
  messages,
  isLoading,
  handleSendMessage,
}) => {
  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scroll({
        top: messagesContainer.scrollHeight + 1000,
        behavior: "smooth",
      });
      console.log(
        "Scrolling to bottom of messages container:",
        messagesContainer.scrollHeight
      );
    }
  }, [messages]);

// Function to format text with **bold** support and <br> for newlines
const formatText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)|(\n)/); // Split by **bold text** and \n
  return parts.map((part, index) => {
    if (part === '\n') {
      return <br key={index} />;
    } else if (part?.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};

  return (
    <div className="chatbot-messages" id="messages-container">
      {messages.map((msg, index) => (
        <React.Fragment key={index}>
          {/* Text Messages */}
          {msg?.text && !msg.products_recommendations && (
            <div
              className={`chatbot-message ${msg.type} ${
                msg.isButton ? "suggestion" : ""
              }`}
            >
              {msg.isButton ? (
                <p
                  className="chatbot-text"
                  onClick={() => handleSendMessage(msg!.text!)}
                >
                  {formatText(msg.text)}
                </p>
              ) : (
                <p className="chatbot-text">{formatText(msg.text)}</p>
              )}
            </div>
          )}

          {/* Product Messages */}
          {msg.products_recommendations && <ProductMessage msg={msg} />}
        </React.Fragment>
      ))}
      {isLoading && (
        <div className="chatbot-message assistant">
          <div className="loading-container">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotMessages;