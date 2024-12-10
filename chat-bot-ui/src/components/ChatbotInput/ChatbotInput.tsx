import React from "react";
import "./ChatbotInput.css";

interface ChatbotInputProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const ChatbotInput: React.FC<ChatbotInputProps> = ({
  userInput,
  setUserInput,
  handleSendMessage,
  isLoading,
}) => {
  return (
    <div className="chatbot-input-container">
      <input
        type="text"
        className="chatbot-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Write a message..."
      />
      <button
        className={`chatbot-send-button ${
          userInput.length < 1 ? "disabled" : ""
        }`}
        onClick={() => {
          setUserInput("");
          handleSendMessage();
        }}
        disabled={isLoading}
      >
        ➤
      </button>
    </div>
  );
};

export default ChatbotInput;
