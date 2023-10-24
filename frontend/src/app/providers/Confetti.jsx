"use client";
import { createContext, useContext, useState } from "react";

const ConfettiContext = createContext(null);

const ConfettiProvider = ({ children }) => {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive((current) => !current);
  };

  const deactivate = () => {
    setActive(false);
  };

  const activate = () => {
    setActive(true);
  };

  return (
    <ConfettiContext.Provider value={{ active, toggle, activate, deactivate }}>
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfetti = () => {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error("useConfetti should be used inside of ConfettiProvider");
  }

  return context;
};

export default ConfettiProvider;
