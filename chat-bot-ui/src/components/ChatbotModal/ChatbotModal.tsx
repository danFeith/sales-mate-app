import React, { useEffect, useState } from "react";
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
  modalRef: React.RefObject<HTMLDivElement>;
}

const assistantProductRecommandationMessage: Message = {
  type: "assistant",
  text: "Here are some top recommendations for you!",
  products_recommendations: [
    {
      title: "The Complete Snowboard",
      description:
        "A high-performance snowboard designed for extreme mountain adventures.",
      price: 799.99,
      currency: "ILS",
      image_url:
        "https://cdn.shopify.com/s/files/1/0612/5142/0227/files/Main_589fc064-24a2-4236-9eaf-13b2bd35d21d.jpg?v=1731185145",
      product_link:
        "https://quickstart-49562075.myshopify.com/products/the-minimal-snowboard",
    },
    {
      title: "Mountain Slayer Snowboard",
      description:
        "A high-performance snowboard designed for extreme mountain adventures.",
      price: 499.99,
      currency: "ILS",
      image_url:
        "https://cdn.shopify.com/s/files/1/0612/5142/0227/files/Main_d624f226-0a89-4fe1-b333-0d1548b43c06.jpg?v=1731185145",
      product_link:
        "https://quickstart-49562075.myshopify.com/products/the-minimal-snowboard",
    },
  ],
};

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose, modalRef }) => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "assistant", text: "How can we help you today? 👋" },
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

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMessage: Message = { type: "user", text };
    setMessages([...messages, newUserMessage]);
    addMessageToSessionConversation(newUserMessage);
    setIsLoading(true);

    try {
      const payload = {
        user_message: text,
        shop_domain: window.shopDomain,
      };

      const response = await axios.post(
        "https://eccomerce-virtual-assistant.onrender.com/chat",
        payload
      );

      const { model_reply, products_recommendations } = response.data;

      const newAssistantMessage: Message = {
        type: "assistant",
        text: model_reply,
        products_recommendations: products_recommendations || [], // If no products, default to an empty array
      };

      setMessages([...messages, newAssistantMessage]);
      addMessageToSessionConversation(newAssistantMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      // const assistantErrorMessage: Message = {
      //   type: "assistant",
      //   text: "Sorry, I could not fetch an answer. Please try again later.",
      // };
      setMessages([
        ...messages,
        newUserMessage,
        assistantProductRecommandationMessage,
      ]);
      addMessageToSessionConversation(assistantProductRecommandationMessage);
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
        handleSendMessage={handleSendMessage}
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
