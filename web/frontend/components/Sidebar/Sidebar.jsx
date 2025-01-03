import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">AI</div>
        <h1 className="logo-text">Ecommind.AI</h1>
      </div>
      <nav className="menu">
        <p className="menu-title">Main Menu</p>
        <ul>
          <li className="menu-item active">
            <div className="icon">⚪</div>
            <span>Welcome!</span>
          </li>
          <li className="menu-item">
            <div className="icon">🚀</div>
            <span>Setup Wizard</span>
          </li>
          <li className="menu-item">
            <div className="icon">📊</div>
            <span>Dashboard 1</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
