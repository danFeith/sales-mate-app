import React, { useEffect, useState } from "react";
import ChatbotHeader from "../ChatbotHeader/ChatbotHeader";
import ChatbotMessages from "../ChatbotMessages/ChatbotMessages";
import ChatbotInput from "../ChatbotInput/ChatbotInput";
import "./ChatbotModal.css";
import axios from "axios";
import {
  addMessageToSessionConversation,
  generateConversationId,
  getSessionConversation,
  getSessionConversationId,
  setSessionConversationId,
} from "../../utils";
import { Message } from "../../types";

interface ChatbotModalProps {
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose, modalRef }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [conversationId, setConversationId] = useState<number>(0);

  useEffect(() => {
    let convId = getSessionConversationId();
    if (!convId) {
      convId = generateConversationId();
      setSessionConversationId(convId);
    }
    setConversationId(convId);

    const conversation = getSessionConversation();
    setMessages([...messages, ...conversation]);
    setIsVisible(true);

    return () => setIsVisible(false);
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
        shop_domain: window.shopDomain || "dor-test-shop",
        conv_id: conversationId,
      };

      const response = await axios.post(
        "https://eccomerce-virtual-assistant.onrender.com/chat",
        payload
      );

      const { model_reply } = response.data;

      // Parse the model_reply content
      const content = JSON.parse(model_reply).content;

      const newAssistantMessages: Message[] = [];

      content.forEach((item: any) => {
        if (item.text) {
          // Add text message as a regular assistant message
          newAssistantMessages.push({ type: "assistant", text: item.text });
        } else if (item.product_name) {
          // Add product message with description and product details
          const productMessage: Message = {
            type: "assistant",
            text: item.product_description,
            products_recommendations: [
              {
                title: item.product_name,
                price: item.product_price,
                currency: item.product_currency,
                image_url: item.product_image_url,
                product_link: `/products/${item.product_handle}`,
              },
            ],
          };
          newAssistantMessages.push(productMessage);
        }
      });

      setMessages([...messages, newUserMessage, ...newAssistantMessages]);
      newAssistantMessages.forEach((msg) =>
        addMessageToSessionConversation(msg)
      );
    } catch (error) {
      console.error("Error sending message:", error);
      const assistantErrorMessage: Message = {
        type: "assistant",
        text: "Sorry, I could not fetch an answer. Please try again later.",
      };
      setMessages([...messages, newUserMessage, assistantErrorMessage]);
      addMessageToSessionConversation(assistantErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={modalRef} className={`chatbot-modal ${isVisible ? "show" : ""}`}>
      <ChatbotHeader onClose={onClose} setMessages={setMessages} />
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
