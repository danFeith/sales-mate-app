import React, { useEffect, useRef, useState } from "react";
import ChatbotHeader from "../ChatbotHeader/ChatbotHeader";
import ChatbotMessages from "../ChatbotMessages/ChatbotMessages";
import ChatbotInput from "../ChatbotInput/ChatbotInput";
import "./ChatbotModal.css";
import axios from "axios";
import {
  addMessageToSessionConversation,
  getSessionConversation,
} from "../../utils";
import { Message } from "../../types";

interface ChatbotModalProps {
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null); // Ref to the modal itself
  const [messages, setMessages] = useState<Message[]>([
    { type: "assistant", text: "How can we help you today? 👋" },
    { type: "assistant", text: "Chat With Human Instead", isButton: true },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Used to add the "show" class

  useEffect(() => {
    const conversation = getSessionConversation();
    setMessages([...messages, ...conversation]);
    setIsVisible(true);
    return () => setIsVisible(false); // Clean up when component unmounts
  }, []);

  // Handle clicks outside of the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Call the onClose method if the click is outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { type: "user", text };
    setMessages([...messages, newUserMessage]);
    addMessageToSessionConversation(newUserMessage);
    setIsLoading(true);

    try {
      // Define the request payload
      const payload = {
        user_message: text,
        shop_domain: window.shopDomain,
      };

      // Make the POST request with axios
      const response = await axios.post(
        "https://eccomerce-virtual-assistant.onrender.com/chat",
        payload
      );

      // Extract model_reply from the response
      const { model_reply } = response.data;

      // Update messages with the bot's reply
      const newAssistantMessage: Message = {
        type: "assistant",
        text: model_reply,
      };
      setMessages([...messages, newAssistantMessage]);
      addMessageToSessionConversation(newAssistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      const assistantErrortMessage: Message = {
        type: "assistant",
        text: "Sorry, I could not fetch an answer. Please try again later.",
      };
      setMessages([...messages, ...[newUserMessage, assistantErrortMessage]]);
      addMessageToSessionConversation(assistantErrortMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={modalRef} className={`chatbot-modal ${isVisible ? "show" : ""}`}>
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
