import React from "react";
import "./Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to Ecommind.AI 🎉</h1>
        <p className="welcome-description">
          Ecommind.AI is your new AI-powered assistant for enhancing customer
          support and boosting sales on your Shopify store. This smart extension
          seamlessly integrates with your store and provides automated answers
          to customer inquiries.
        </p>

        <div className="instructions">
          <h2 className="instructions-title">How to Enable and Test</h2>
          <ul className="instructions-list">
            <li>
              Go to your <strong>Shopify Admin</strong> panel.
            </li>
            <li>
              Navigate to <strong>Online Store &gt; Themes</strong>.
            </li>
            <li>
              Click on <strong>Customize</strong> to open the theme
              customization editor.
            </li>
            <li>
              In the left sidebar, go to the <strong>App Embeds</strong> tab.
            </li>
            <li>
              Enable the <strong>Ecommind.AI</strong> assistant extension.
            </li>
            <li>
              Save the changes and test the assistant on your storefront to see
              it in action!
            </li>
          </ul>
        </div>

        <p className="footer-note">
          Need help? Reach out to our support team anytime. Let Ecommind.AI
          revolutionize your store's customer experience!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
