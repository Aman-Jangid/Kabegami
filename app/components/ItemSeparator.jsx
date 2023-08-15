import React from "react";
import { StyleSheet, View } from "react-native";

export default function ItemSeparator({ color = "black" }) {
  return <View style={[styles.container, { backgroundColor: color }]}></View>;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1.5,
  },
});
