import { Message } from "../../../types";
import "../ChatbotMessages.css";
import { ProductCard } from "./ProductCard";
import { ProductDescription } from "./ProductDescription";

export const ProductMessage = ({ msg }: { msg: Message }) => {
  return (
    <div className="chatbot-message assistant">
      {/* Product Description */}
      {msg.text && <ProductDescription description={msg.text} />}
      {/* Product Cards */}
      {(msg?.products_recommendations || []).map((product, productIndex) => (
        <ProductCard key={productIndex} product={product} />
      ))}
    </div>
  );
};
