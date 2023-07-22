import React, { useRef } from "react";
import { StyleSheet, View, Animated, PanResponder, Text } from "react-native";
import WallpaperSet from "./WallpaperSet";

export default function GestureDismiss() {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: 0 });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 50) {
        Animated.timing(position, {
          toValue: { x: 500, y: 0 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          // cleanup or actions
        });
      } else if (gesture.dx < -50) {
        Animated.timing(position, {
          toValue: { x: -500, y: 0 },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          // actions or cleanup
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: position.x }] },
        { ...panResponder.panHandlers },
      ]}
    >
      <WallpaperSet />
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "lightgray",
  },
});
