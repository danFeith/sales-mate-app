import React, { useEffect } from "react";
import "./ChatbotMessages.css";
import { Message, ProductRecommendation } from "../../types";
import { CURRENCY_SYMBOLS } from "../../constants";

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
                  {msg.text}
                </p>
              ) : (
                <p className="chatbot-text">{msg.text}</p>
              )}
            </div>
          )}

          {/* Product Messages */}
          {msg.products_recommendations && (
            <div className="chatbot-message assistant">
              {/* Product Description */}
              {msg.text && <p className="product-description">{msg.text}</p>}
              {/* Product Cards */}
              {msg.products_recommendations.map((product, productIndex) => (
                <ProductCard key={productIndex} product={product} />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
      {isLoading && <div className="chatbot-message assistant">Typing...</div>}
    </div>
  );
};

interface ProductCardProps {
  product: ProductRecommendation;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a
      href={product.product_link || "#"}
      target="_self"
      className="product-card"
    >
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.title}
          className="product-image"
        />
      )}
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        {product.description && (
          <p className="product-description">
              {product.description}
          </p>
        )}
        <div className="bottom-container">
          {product.price && product.currency && (
            <p className="product-price">
              {product.price}{CURRENCY_SYMBOLS[product.currency] ?? ""}
            </p>
          )}
          <a
            href={product.product_link || "#"}
            target="_self"
            rel="noopener noreferrer"
            className="product-button"
          >
            View Product
          </a>
        </div>
      </div>
    </a>
  );
};

export default ChatbotMessages;