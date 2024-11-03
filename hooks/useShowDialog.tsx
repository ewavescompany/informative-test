import { useState } from "react";

export function useShowDialog() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the dialog
  const openDialog = () => {
    setIsOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsOpen(false);
  };

  // Toggle the dialog state
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
}
