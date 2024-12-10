import { useRef, useState } from "react";
import "./app.css";
import ChatbotButton from "./components/ChatbotButton/ChatbotButton";
import ChatbotModal from "./components/ChatbotModal/ChatbotModal";
import { useHandleClickOutSide } from "./hooks/use-handle-click-outside";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // Ref to the modal itself
  const buttonRef = useRef<HTMLDivElement>(null); // Ref to the button itself
  useHandleClickOutSide(modalRef, buttonRef, () => setModalVisible(false));
  
  return (
    <div>
      <ChatbotButton
        buttonRef={buttonRef}
        onClick={() => {
          setModalVisible(!modalVisible);
        }}
      />
      {modalVisible && (
        <ChatbotModal
          modalRef={modalRef}
          onClose={() => {
            setModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
