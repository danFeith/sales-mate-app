import { useEffect, useRef, useState } from "react";
import "./app.css";
import ChatbotButton from "./components/ChatbotButton/ChatbotButton";
import ChatbotModal from "./components/ChatbotModal/ChatbotModal";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // Ref to the modal itself
  const buttonRef = useRef<HTMLDivElement>(null); // Ref to the button itself

  // Handle clicks outside of the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setModalVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
