import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import ThemeContext from "../theme/ThemeContext";

export default function Screen({ children }) {
  const { color } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 45, backgroundColor: color.colorPrimary },
  });

  return <View style={styles.container}>{children}</View>;
}
