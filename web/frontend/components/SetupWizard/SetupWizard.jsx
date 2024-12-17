import React from "react";
import ChatbotConfiguration from "../ChatbotConfiguration/ChatbotConfiguration.jsx";
import "./SetupWizard.css";

const SetupWizard = () => {
  return (
    <div className="setup-wizard">
      <h1 className="title">Setup Wizard</h1>
      <ChatbotConfiguration />
    </div>
  );
};

export default SetupWizard;
