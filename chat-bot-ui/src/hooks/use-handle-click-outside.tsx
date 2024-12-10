import { useEffect } from "react";

export const useHandleClickOutSide = (
  modalRef: React.RefObject<HTMLDivElement>,
  buttonRef: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  // Handle clicks outside of the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};
