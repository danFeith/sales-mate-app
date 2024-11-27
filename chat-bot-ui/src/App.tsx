import { useState } from 'react';
import './app.css';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'How can we help you today? 👋' },
    { type: 'bot', text: 'Chat With Human Instead', isButton: true },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user's message to the chat
    const newMessages = [...messages, { type: 'user', text: userInput }];
    setMessages(newMessages);
    setIsLoading(true); // Show typing indicator

    try {
      // Fetch response from server
      const response = await fetch(`https://shopify-openai-server.onrender.com/ask?query=${encodeURIComponent(userInput)}`);
      const data = await response.json();

      // Add bot response
      setMessages([...newMessages, { type: 'bot', text: data.answer }]);
    } catch {
      setMessages([...newMessages, { type: 'bot', text: 'Sorry, I could not fetch an answer. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }

    setUserInput('');
  };

  const handleSpecialButton = (text: string) => {
    setMessages([...messages, { type: 'user', text }, { type: 'bot', text: 'Connecting you to a human...' }]);
  };

  return (
    <div>
      <div className="chatbot-button" onClick={() => setModalVisible(true)}>
        <span className="chatbot-icon">💬</span>
      </div>

      {modalVisible && (
        <div className="chatbot-modal">
          <div className="chatbot-modal-header">
            <button className="chatbot-back-button" onClick={() => setModalVisible(false)}>←</button>
            <strong>AI Chatbot</strong>
            <button className="chatbot-options-button">⋮</button>
          </div>
          <div className="chatbot-modal-body">
            <div className="chatbot-messages">
              {messages.map((msg, index) =>
                msg.isButton ? (
                  <button
                    key={index}
                    className="chatbot-special-button"
                    onClick={() => handleSpecialButton(msg.text)}
                  >
                    {msg.text}
                  </button>
                ) : (
                  <div key={index} className={`chatbot-message ${msg.type}`}>
                    {msg.text}
                  </div>
                )
              )}
              {isLoading && <div className="chatbot-message bot">Typing...</div>}
            </div>
            <div className="chatbot-input-container">
              <input
                type="text"
                className="chatbot-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="chatbot-send-button" onClick={handleSendMessage} disabled={isLoading}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
