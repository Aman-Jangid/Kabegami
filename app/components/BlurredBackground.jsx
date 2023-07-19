import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function BlurredBackground() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
    width: 400,
    height: 50,
    zIndex: 1,
  },
});
