import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import ThemeContext from "../theme/ThemeContext";
const AsyncContext = createContext();

export const AsyncProvider = ({ children }) => {
  const [downloading, setDownloading] = useState(false);

  const { color } = useContext(ThemeContext);

  return (
    <AsyncContext.Provider value={{ downloading, setDownloading }}>
      <View style={{ backgroundColor: color.colorPrimary, flex: 1 }}>
        {children}
      </View>
    </AsyncContext.Provider>
  );
};

export const useAsyncContext = () => {
  return useContext(AsyncContext);
};
