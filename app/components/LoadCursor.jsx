import React from "react";
import { StyleSheet, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";

export default function LoadCursor({ progress }) {
  return (
    <AnimatedLottieView
      source={require("../assets/animations/progress.json")}
      autoPlay
      speed={5}
      style={styles.container}
      loop={false}
      progress={progress}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
  },
});
