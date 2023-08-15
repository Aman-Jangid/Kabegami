import React, { useEffect, useRef } from "react";
import {
  Dimensions,
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
}) {
  const scrollViewRef = useRef(null);

  const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

  const scale = screenHeight / 829; // Assuming 829 is the phone's height
  const width = originalWidth * scale;

  const scrollToMiddle = () => {
    const contentWidth = width;

    const scrollToX = contentWidth / 2;
    scrollViewRef.current?.scrollTo({ x: scrollToX, animated: true });
  };

  useEffect(() => {
    scrollToMiddle();
  }, []);

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ width: originalWidth }}
        onScroll={onPress}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
      >
        {/* p9381e */}
        <FastImage
          source={{
            uri: uri,
            priority: FastImage.priority.high,
          }}
          style={{ aspectRatio: originalWidth / 829 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {},
});
