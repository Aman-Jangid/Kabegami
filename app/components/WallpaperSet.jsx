import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

import setWallpaper from "../services/setWallpaper";
import downloadImage from "../services/downloadImage";
import DismissGesture from "./DismissGesture";
import LoadCursor from "./LoadCursor";

export default function WallpaperSet({
  imageUrl,
  hideDownload,
  marginBottom = 90,
  handleShowOptions,
}) {
  const [processing, setProcessing] = useState(false);

  const round = {
    borderRadius: 50,
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.1)",
  };

  const slideAnimation = useRef(new Animated.Value(0)).current;

  const slideOut = (direction) => {
    const slideOutAnimation = Animated.timing(slideAnimation, {
      toValue: direction === "l" ? 200 : -200,
      duration: 800,
      useNativeDriver: true,
    });
    const startAnimation = () => {
      slideOutAnimation.start();
    };

    const animationTimeout = setTimeout(startAnimation, 0);

    setTimeout(() => {
      clearTimeout(animationTimeout);
      handleShowOptions();
    }, 500);
  };

  const translateX = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const wallpaperSetter = async (url, screen) => {
    setProcessing(true);
    await setWallpaper(url, screen);
    setProcessing(false);
  };

  return (
    <Animated.View
      style={[{ marginBottom, transform: [{ translateX }] }, styles.container]}
    >
      <DismissGesture onDismiss={(direction) => slideOut(direction)}>
        <View style={[styles.content]}>
          <IconButton
            name="home"
            color={color.color8}
            size={40}
            iconPack="MI"
            style={round}
            onPress={() => wallpaperSetter(imageUrl, "home")}
          />
          <IconButton
            name="lock"
            color={color.color8}
            size={40}
            iconPack="MI"
            style={round}
            onPress={() => wallpaperSetter(imageUrl, "lock")}
          />
          <IconButton
            name="home-lock"
            color={color.color8}
            size={40}
            iconPack="MCI"
            style={round}
            onPress={() => wallpaperSetter(imageUrl, "both")}
          />
          {!hideDownload && (
            <IconButton
              name="file-download"
              color={color.color8}
              size={40}
              iconPack="MI"
              style={round}
              onPress={() => downloadImage(imageUrl)}
            />
          )}
        </View>
      </DismissGesture>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
    alignSelf: "center",
  },
  content: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    padding: 15,

    backgroundColor: color.color6,
    justifyContent: "space-evenly",
    borderRadius: 20,
    zIndex: 1000,
  },
});
