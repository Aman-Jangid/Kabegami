import React, { createContext, useContext, useState } from "react";
const AsyncContext = createContext();

export const AsyncProvider = ({ children }) => {
  const [downloading, setDownloading] = useState(false);

  return (
    <AsyncContext.Provider value={{ downloading, setDownloading }}>
      {children}
    </AsyncContext.Provider>
  );
};

export const useAsyncContext = () => {
  return useContext(AsyncContext);
};
