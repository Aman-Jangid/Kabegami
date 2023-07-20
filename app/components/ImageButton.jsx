import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import color from "../theme/colors";

export default function ImageButton({ title, onPress, textColor, background }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={[styles.title, { color: !textColor && "#fff" }]}>
        {title}
      </Text>
      <Image source={background} style={styles.background} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 45,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    color: "white",
    position: "absolute",
    fontSize: 20,
    textShadowColor: color.black,
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 15,
    fontWeight: "900",
    textTransform: "uppercase",
    zIndex: 1000,
  },
  background: {
    width: "100%",
    height: "100%",
  },
});
