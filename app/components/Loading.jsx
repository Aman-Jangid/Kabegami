import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <AnimatedLottieView
      source={require("../assets/animations/loadingImages.json")}
      autoPlay
      loop
    />
  );
}
