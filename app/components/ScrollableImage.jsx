import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import FastImage from "react-native-fast-image";

export default function ScrollableImage({
  uri,
  width: originalWidth,
  height: originalHeight,
  onPress,
  local,
}) {
  const scrollViewRef = useRef(null);
  const [localWidth, setLocalWidth] = useState(1920);
  const [localHeight, setLocalHeight] = useState(1080);

  const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

  const scale = screenHeight / 829; // Assuming 829 is the phone's height
  const width = originalWidth * scale;

  const scrollToMiddle = () => {
    const scrollToX = originalWidth / 5.5;
    scrollViewRef.current?.scrollTo({ x: scrollToX, animated: true });
  };

  const [overscrolling, setOverscrolling] = useState(false);

  const handleScroll = (event) => {
    onPress();
    const scrollY = event.nativeEvent.contentOffset.y;

    if (scrollY < 0) {
      setOverscrolling(true);
    } else {
      setOverscrolling(false);
    }
  };

  useEffect(() => {
    console.log(overscrolling);
  }, [overscrolling]);

  useEffect(() => {
    if (local) {
      Image.getSize(uri, (width, height) => {
        setLocalWidth(width);
        setLocalHeight(height);
      });
    }

    scrollToMiddle();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        overScrollMode="always"
        scrollEventThrottle={16}
      >
        <FastImage
          source={{
            uri: uri,
            priority: FastImage.priority.high,
          }}
          style={{
            aspectRatio: local
              ? localWidth / localHeight
              : originalWidth / originalHeight,
            alignItems: "center",
            overflow: "hidden",
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
