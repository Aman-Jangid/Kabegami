import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import color from "../theme/colors";
import WallpaperSet from "../components/WallpaperSet";
import Icon from "../components/Icon";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ImageDisplay({}) {
  const [liked, setLiked] = useState(true);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const { navigate } = useNavigation();
  const route = useRoute();

  const handleShowOptions = () => {
    setOptionsVisible(!optionsVisible);
    // setImageUrl(url);
  };

  const handleCloseViewer = () => {
    navigate("Explore");
  };

  const buttonContainer = {
    backgroundColor: color.lowOpacityWhite,
    borderRadius: 50,
    padding: 3,
  };

  return (
    <View style={styles.container}>
      {optionsVisible && (
        <WallpaperSet imageUrl={route.params.url} hideDownload />
      )}
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: route.params.url }}
      />
      <View style={styles.gesture}>
        <IconButton
          name="chevron-thin-down"
          iconPack="EI"
          size={50}
          color={color.white}
          onPress={handleCloseViewer}
        />
      </View>
      <View style={styles.buttons}>
        <IconButton
          name="collections"
          iconPack="MI"
          size={30}
          color={color.black}
          style={buttonContainer}
        />
        <Button
          title="set as wallpaper"
          color={color.lowOpacityWhite}
          textColor={color.black}
          onPress={() => handleShowOptions()}
        />
        <IconButton
          name={liked ? "heart" : "hearto"}
          iconPack="ADI"
          size={30}
          color={color.black}
          style={buttonContainer}
          onPress={() => setLiked(!liked)}
        />
      </View>
      <StatusBar style="inverted" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  gesture: {
    position: "absolute",
    top: -10,
    paddingTop: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: color.lowOpacityBlack,
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
  buttons: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: 20,
    gap: 10,
    alignSelf: "center",
  },
});
