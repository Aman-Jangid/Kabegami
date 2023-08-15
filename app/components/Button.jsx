import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Button({
  title,
  onPress,
  width,
  color,
  textColor,
  border = true,
  disabled = false,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: color, width, borderRadius: border ? 10 : 0 },
      ]}
    >
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
