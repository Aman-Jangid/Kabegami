import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import color from "../theme/colors";

export default function Input({ lines }) {
  return <TextInput style={[styles.input]} multiline numberOfLines={lines} />;
}
const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    width: "80%",
    margin: 10,
    borderRadius: 10,
    backgroundColor: color.white,
    padding: 5,
  },
});
