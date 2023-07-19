import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function TouchableListItem({ text, handlePress }) {
  return (
    <TouchableHighlight style={styles.touchable} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  touchable: { width: 330 },
  text: {
    width: "100%",
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontSize: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 5,
    borderRadius: 10,
  },
});
