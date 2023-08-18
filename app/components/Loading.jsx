import AnimatedLottieView from "lottie-react-native";
import React from "react";

export default function Loading({ source, speed = 1 }) {
  return <AnimatedLottieView source={source} autoPlay loop speed={speed} />;
}
