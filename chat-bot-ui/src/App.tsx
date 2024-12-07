import { useState } from "react";
import "./app.css";
import ChatbotButton from "./components/ChatbotButton/ChatbotButton";
import ChatbotModal from "./components/ChatbotModal/ChatbotModal";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <ChatbotButton onClick={() => setModalVisible(true)} />
      {modalVisible && <ChatbotModal onClose={() => setModalVisible(false)} />}
    </div>
  );
};

export default App;
