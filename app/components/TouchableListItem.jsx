import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import color from "../theme/colors";

export default function TouchableListItem({ text, handlePress }) {
  return (
    <TouchableOpacity style={styles.touchable} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
      <Icon name="enter" iconPack="ADI" size={20} color={color.grey} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  touchable: {
    width: 330,
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.35)",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
    flex: 1,
    alignSelf: "center",
    fontSize: 16,
  },
});
