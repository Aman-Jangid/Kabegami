import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Animated,
  Touchable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function DraggableImage({ uri }) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [width, setWidth] = useState(null);
  const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });
  const getImageWidth = () => {
    Image.getSize(uri, (width) => {
      setWidth(width);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart: () => {
        setFinalPosition({
          x: finalPosition.x,
          y: 0,
        });
      },
      onPanResponderMove: (e, gestureState) => {
        setFinalPosition({
          x: finalPosition.x + gestureState.dx,
          y: 0,
        });
      },
    })
  ).current;

  useEffect(() => {
    pan.setValue({ x: finalPosition.x, y: finalPosition.y });
  }, [finalPosition]);

  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      <Animated.Image
        source={{ uri: uri }}
        onLoad={getImageWidth}
        style={[
          styles.image,
          {
            transform: [{ translateX: finalPosition.x }],
            width: width,
          },
        ]}
        {...panResponder.panHandlers}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
});
