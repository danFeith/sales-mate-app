import { CURRENCY_SYMBOLS } from "../../../constants";
import { ProductRecommendation } from "../../../types";
import './ProductRecommendation.css'

interface ProductCardProps {
    product: ProductRecommendation;
  }
  
  export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
  