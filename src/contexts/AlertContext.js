import { createContext, useContext, useState } from "react";
import SnakBarAlert from "../components/SnakBarAlert";

export const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  function handleOpenToastAlert(message) {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }
  return (
    <AlertContext.Provider value={ handleOpenToastAlert }>
      <SnakBarAlert open={open} message={message} />
      {children}
    </AlertContext.Provider>
  );
};

export const useToastAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useToastAlert must be used within an AlertProvider");
  }
  return context;
};
