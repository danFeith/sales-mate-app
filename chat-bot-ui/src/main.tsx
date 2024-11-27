import React from 'react';
import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import App from './App.tsx';

// Extend the TypeScript definition of the window object
declare global {
  interface Window {
    React: typeof React;
    ReactDOM: typeof ReactDOM;
    Chatbot: React.FC;
  }
}

// Expose React and ReactDOM globally
window.React = React;
window.ReactDOM = ReactDOM; // Use the full ReactDOM API

// Expose the App component (or Chatbot) globally
window.Chatbot = App;

// Automatically render the app if a root element is present
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    rootElement,
  );
}
