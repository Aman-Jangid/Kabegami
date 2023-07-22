import React from "react";
import { StyleSheet, View } from "react-native";
import color from "../theme/colors";

export default function Screen({ children }) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, backgroundColor: color.colorPrimary },
});
