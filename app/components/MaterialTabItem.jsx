import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MaterialTabItem({ color, title }) {
  return (
    <Text
      style={[
        styles.title,
        { color: color, borderBottomWidth: 3, borderBottomColor: color },
      ]}
    >
      {title}
    </Text>
  );
}
const styles = StyleSheet.create({
  title: {
    left: "50%",
    transform: [{ translateX: -60 }],
    position: "absolute",
    paddingBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    width: 120,
  },
});
