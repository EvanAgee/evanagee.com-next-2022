import React, { useState, createContext } from "react";
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [pageTheme, setPageTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        pageTheme,
        setPageTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
