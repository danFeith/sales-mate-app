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
import { Message, ProductRecommendation } from "../../types";

interface ChatbotModalProps {
  onClose: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose, modalRef }) => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "assistant", text: "How can we help you today? 👋" },
  ]);
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
      let productGroup: ProductRecommendation[] = [];

      content.forEach((item: any) => {
        if (item.text) {
          // Push current product group if it exists
          if (productGroup.length > 0) {
            newAssistantMessages.push({
              type: "assistant",
              products_recommendations: [...productGroup],
            });
            productGroup = [];
          }
          // Push the text message
          newAssistantMessages.push({ type: "assistant", text: item.text });
        } else if (item.product_name) {
          // Create a product recommendation object
          const product: ProductRecommendation = {
            title: item.product_name,
            description: item.product_description,
            price: item.product_price,
            currency: item.product_currency,
            image_url: item.product_image_url,
            product_link: `${window.shopDomain}/products/${item.product_handle}`,
          };

          // Add product to the group
          productGroup.push(product);

          // If the group has reached 2 products, push it to messages
          if (productGroup.length === 2) {
            newAssistantMessages.push({
              type: "assistant",
              products_recommendations: [...productGroup],
            });
            productGroup = [];
          }
        }
      });

      // Push any remaining products in the group
      // if (productGroup.length > 0) {
      //   newAssistantMessages.push({
      //     type: "assistant",
      //     products_recommendations: [...productGroup],
      //   });
      // }

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
