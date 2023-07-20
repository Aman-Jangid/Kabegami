import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

import setWallpaper from "../services/setWallpaper";
import downloadImage from "../services/downloadImage";

export default function WallpaperSet({ imageUrl, hideDownload }) {
  const round = {
    borderRadius: 50,
    padding: 2,
    backgroundColor: "white",
  };

  return (
    <View style={styles.container}>
      <IconButton
        name="home"
        color={color.black}
        size={40}
        iconPack="MI"
        style={round}
        onPress={() => setWallpaper(imageUrl, "home")}
      />
      <IconButton
        name="lock"
        color={color.black}
        size={40}
        iconPack="MI"
        style={round}
        onPress={() => setWallpaper(imageUrl, "lock")}
      />
      <IconButton
        name="home-lock"
        color={color.black}
        size={40}
        iconPack="MCI"
        style={round}
        onPress={() => setWallpaper(imageUrl, "both")}
      />
      {!hideDownload && (
        <IconButton
          name="download"
          color={color.black}
          size={40}
          iconPack="FAI"
          style={round}
          onPress={() => downloadImage(imageUrl)}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    // paddingTop: 20,
    padding: 20,
    marginBottom: 70,
    backgroundColor: "salmon",
    position: "absolute",
    justifyContent: "space-evenly",
    // borderTopRightRadius: 20,
    borderRadius: 20,
    // borderTopLeftRadius: 20,
    bottom: 0,
    zIndex: 1000,
  },
});
