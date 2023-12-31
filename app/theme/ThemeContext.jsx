import React, { createContext, useEffect, useState } from "react";
import storage from "../services/storage";
import keys from "../keys";

const ThemeContext = createContext();

const dark = {
  black: "#000",
  white: "#fff",
  lightGrey: "#ddd",
  colorPrimary: "#10002B",
  color2: "#240046",
  color3: "#3C096C",
  color4: "#5A189A",
  color5: "#7B2CBF",
  color6: "#9D4EDD",
  color7: "#C77DFF",
  color8: "#E0AAFF",
  color9: "#F72585",
  color10: "#B5179E",
  color11: "#7209B7",
  color15: "#3F37C9",
  color17: "#4895EF",
  color18: "#4CC9F0",
  color19: "#DE3535",
};

const light = {
  black: "#000",
  white: "#fff",
  lightGrey: "#ddd",
  colorPrimary: "#edf2fb",
  color2: "#e2eafc",
  color3: "#fae0e4",
  color4: "#abc4ff",
  color5: "#ec8385",
  color6: "#e66063",
  color7: "#343f54",
  color8: "#f3b6b9",
  color9: "#ec4040",
  color10: "#ee6c4d",
  color11: "#B8C0FF",
  color19: "#d15341",
  color15: "#b8e6b8",
  color18: "#00a9a5",
  color17: "#c3a995",
};

export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState(dark);
  const [theme, setTheme] = useState("dark");

  const getThemeAsync = async () => {
    const value = await storage.getData(keys.THEME);
    setTheme(value);

    setColor(value === "dark" ? dark : light);
  };

  const toggleTheme = (value) => {
    if (value === "dark") {
      setColor(dark);
      setTheme("dark");
    } else {
      setColor(light);
      setTheme("light");
    }
  };

  useEffect(() => {
    getThemeAsync();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, color, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
