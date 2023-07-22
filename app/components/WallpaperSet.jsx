import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

import setWallpaper from "../services/setWallpaper";
import downloadImage from "../services/downloadImage";
import DismissGesture from "./DismissGesture";

export default function WallpaperSet({
  imageUrl,
  hideDownload,
  marginBottom = 90,
}) {
  const [hidden, setHidden] = useState(false);

  const round = {
    borderRadius: 50,
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.1)",
  };

  const handleCloseOptions = () => {
    setHidden(true);
    console.log(hidden);
  };

  return (
    <View style={[{ marginBottom }, styles.container]}>
      {!hidden && (
        <DismissGesture onDismiss={() => handleCloseOptions()}>
          <View style={[styles.content]}>
            <IconButton
              name="home"
              color={color.color8}
              size={40}
              iconPack="MI"
              style={round}
              onPress={() => setWallpaper(imageUrl, "home")}
            />
            <IconButton
              name="lock"
              color={color.color8}
              size={40}
              iconPack="MI"
              style={round}
              onPress={() => setWallpaper(imageUrl, "lock")}
            />
            <IconButton
              name="home-lock"
              color={color.color8}
              size={40}
              iconPack="MCI"
              style={round}
              onPress={() => setWallpaper(imageUrl, "both")}
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
      )}
    </View>
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
