import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import color from "../theme/colors";
import WallpaperSet from "../components/WallpaperSet";
import Icon from "../components/Icon";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ImageDisplay({}) {
  const [liked, setLiked] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const { goBack } = useNavigation();
  const route = useRoute();

  const handleShowOptions = () => {
    setOptionsVisible(!optionsVisible);
    // setImageUrl(url);
  };

  const handleHideOptions = () => {
    setOptionsVisible(false);
  };

  const handleCloseViewer = () => {
    goBack();
  };

  const buttonContainer = {
    // borderWidth: 1.5,
    // borderColor: color.color9,
    textAlignVertical: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 4,
  };

  return (
    <TouchableWithoutFeedback onPress={() => setOptionsVisible(false)}>
      <View style={styles.container}>
        {optionsVisible && (
          <WallpaperSet
            imageUrl={route.params.url}
            hideDownload
            optionsVisible={optionsVisible}
            handleHideOptions={handleHideOptions}
          />
        )}
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: route.params.url }}
        />
        <View style={styles.gestureIndicator}>
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
            size={32}
            color={color.color9}
            style={buttonContainer}
          />
          <Button
            title="set as wallpaper"
            color={color.color9}
            textColor={color.white}
            onPress={() => handleShowOptions()}
          />
          <IconButton
            name={liked ? "heart" : "hearto"}
            iconPack="ADI"
            size={32}
            color={color.color9}
            style={buttonContainer}
            onPress={() => setLiked(!liked)}
          />
        </View>
        <StatusBar style="inverted" />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  gestureIndicator: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.15)",
    top: -10,
    paddingTop: 30,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: 20,
    gap: 10,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
