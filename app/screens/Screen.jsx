import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

export default function Screen({ children }) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
