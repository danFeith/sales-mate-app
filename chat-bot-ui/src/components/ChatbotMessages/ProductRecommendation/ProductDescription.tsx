import { useState } from "react";
import "./ProductDescription.css";

export const ProductDescription = ({
  description,
}: {
  description: string;
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getShortenedDescription = (description: string) => {
    const maxLines = 1;
    const charLimit = maxLines * 50;
    return description.length > charLimit ? (
      <>
        {showFullDescription ? description : description.slice(0, charLimit)}
        <span onClick={toggleDescription} className="more-less-button">
          {" "}
          {showFullDescription ? "less" : "more..."}
        </span>
      </>
    ) : (
      <>{description}</>
    );
  };

  return (
    <div className="product-description">
      {getShortenedDescription(description)}
    </div>
  );
};
