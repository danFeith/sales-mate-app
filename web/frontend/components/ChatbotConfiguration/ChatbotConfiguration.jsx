import React, { useState } from "react";
import "./ChatbotConfiguration.css";

const ChatbotConfiguration = () => {
  const [chatbotName, setChatbotName] = useState("AI Chatbot");
  const [chatbotTone, setChatbotTone] = useState("Professional");
  const [primaryColor, setPrimaryColor] = useState("#3366FF");
  const [greetingMessage, setGreetingMessage] = useState(
    "How can we help you today... 👋"
  );

  return (
    <div className="chatbot-configuration">
      <h2>Chatbot Configuration</h2>
      <div className="icon-section">
        <div className="icon-placeholder">AI</div>
        <button className="change-icon-btn">Change Icon</button>
      </div>
      <div className="form-section">
        <label>
          Chatbot Name
          <input
            type="text"
            value={chatbotName}
            onChange={(e) => setChatbotName(e.target.value)}
          />
        </label>
        <label>
          Chatbot Tone
          <select
            value={chatbotTone}
            onChange={(e) => setChatbotTone(e.target.value)}
          >
            <option value="Professional">Professional</option>
            <option value="Friendly">Friendly</option>
            <option value="Casual">Casual</option>
          </select>
        </label>
        <label>
          Primary Color
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </label>
        <label>
          Greeting Message
          <textarea
            rows={3}
            value={greetingMessage}
            onChange={(e) => setGreetingMessage(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default ChatbotConfiguration;
