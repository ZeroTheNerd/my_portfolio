import React, { createContext, useContext, useState } from "react";

const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState("normal");

  const updateWindowSize = (size) => {
    setWindowSize(size);
  };

  return (
    <WindowContext.Provider value={{ windowSize, updateWindowSize }}>
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowState = () => useContext(WindowContext);
