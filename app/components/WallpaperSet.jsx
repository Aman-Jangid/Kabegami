import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";
import IconButton from "./IconButton";

import { useAsyncContext } from "../context/AsyncContext";

import setWallpaper, { setLocalWallpaper } from "../services/setWallpaper";
import downloadImage from "../services/downloadImage";
import DismissGesture from "./DismissGesture";
import LoadCursor from "./LoadCursor";
import RNFetchBlob from "rn-fetch-blob";
import ThemeContext from "../theme/ThemeContext";

export default function WallpaperSet({
  imageUrl,
  hideDownload,
  marginBottom = 90,
  handleShowOptions,
  local = false,
}) {
  const [processing, setProcessing] = useState(false);
  const { downloading, setDownloading } = useAsyncContext();

  const { color } = useContext(ThemeContext);

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

  const setLocalImageAsWallpaper = async (uri, screen) => {
    console.log(uri);
    const base64Image = await RNFetchBlob.fs.readFile(uri, "base64");
    await setLocalWallpaper(base64Image, screen);
  };

  const wallpaperSetter = async (url, screen) => {
    setProcessing(true);
    local
      ? setLocalImageAsWallpaper(url, screen)
      : await setWallpaper(url, screen);
    setProcessing(false);
  };

  const handleDownload = async () => {
    setDownloading(true);
    await downloadImage(imageUrl);
    setTimeout(() => {
      setDownloading(false);
    }, 1000);
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
              onPress={handleDownload}
            />
          )}
        </View>
      </DismissGesture>
    </Animated.View>
  );
}
