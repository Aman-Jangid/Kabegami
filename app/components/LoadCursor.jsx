import React from "react";
import { StyleSheet, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";

export default function LoadCursor() {
  return (
    <AnimatedLottieView
      source={require("../assets/animations/progress.json")}
      autoPlay
      speed={10}
      style={styles.container}
      loop={false}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
});
