import AnimatedLottieView from "lottie-react-native";
import React from "react";

export default function Loading({ source }) {
  return <AnimatedLottieView source={source} autoPlay loop />;
}
