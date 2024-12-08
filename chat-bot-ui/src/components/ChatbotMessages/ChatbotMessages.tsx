import React, { useEffect, useRef } from "react";
import "./ChatbotMessages.css";
import { Message, ProductRecommendation } from "../../types";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-messages">
      {messages.map((msg, index) => (
        <React.Fragment key={index}>
          {/* Text message */}
          {msg.text && (
            <div className={`chatbot-message ${msg.type}`}>
              {msg.isButton ? (
                <button
                  className="chatbot-special-button"
                  onClick={() => handleSendMessage(msg.text)}
                >
                  {msg.text}
                </button>
              ) : (
                <p className="chatbot-text">{msg.text}</p>
              )}
            </div>
          )}

          {/* Product Recommendations */}
          {msg.products_recommendations && (
            <div className="chatbot-message assistant products">
              {msg.products_recommendations.map((product, productIndex) => (
                <ProductCard key={productIndex} product={product} />
              ))}
              {/* <div className="product-recommendations"> */}
              {/* </div> */}
            </div>
          )}
        </React.Fragment>
      ))}
      {isLoading && <div className="chatbot-message assistant">Typing...</div>}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

interface ProductCardProps {
  product: ProductRecommendation;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a href={product.product_link} style={{textDecoration: 'none'}} className="product-card">
      <img
        src={product.image_url}
        alt={product.title}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">
          {product.price} {product.currency}
        </p>
        <a
          href={product.product_link}
          target="_blank"
          rel="noopener noreferrer"
          className="product-button"
        >
          View Product
        </a>
      </div>
    </a>
  );
};

export default ChatbotMessages;
