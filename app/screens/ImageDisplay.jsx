import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import color from "../theme/colors";
import WallpaperSet from "../components/WallpaperSet";
import { useNavigation, useRoute } from "@react-navigation/native";
import storage from "../services/storage";
import values from "../values";
import CollectionAccumulator from "../components/CollectionAccumulator";
import FullScreenImage from "../components/FullScreenImage";
import DraggableImage from "../components/DraggableImage";

export default function ImageDisplay({}) {
  const [liked, setLiked] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [collectionsVisible, setCollectionsVisible] = useState(false);

  const { goBack } = useNavigation();
  const route = useRoute();

  const setAlreadyLiked = async () => {
    const images = Array.from(await storage.getData(values.LIKED_IMAGES));
    if (images.find((image) => image.path === route.params.path)) {
      setLiked(true);
    }
  };

  useEffect(() => {
    setAlreadyLiked();
  }, [liked]);

  const handleClose = () => {
    setCollectionsVisible(false);
    setOptionsVisible(false);
  };

  const handleCloseViewer = () => {
    goBack();
  };

  const handleLike = async () => {
    setLiked(true);

    await storage.addArrayData(values.LIKED_IMAGES, route.params);
  };

  const buttonContainer = {
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
            imageUrl={route.params.path}
            hideDownload
            optionsVisible={optionsVisible}
            handleShowOptions={() => setOptionsVisible(!optionsVisible)}
          />
        )}
        {collectionsVisible && <CollectionAccumulator />}
        <TouchableWithoutFeedback onPress={handleClose}>
          <DraggableImage uri={route.params.path} />
        </TouchableWithoutFeedback>
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
            size={35}
            color={color.color18}
            style={buttonContainer}
            onPress={() => setCollectionsVisible(!collectionsVisible)}
          />
          <Button
            title="set as wallpaper"
            color={color.color19}
            textColor={color.white}
            onPress={() => setOptionsVisible(!optionsVisible)}
          />
          <IconButton
            name={liked ? "heart" : "hearto"}
            iconPack="ADI"
            size={32}
            color={color.color19}
            style={buttonContainer}
            onPress={handleLike}
          />
        </View>
        <StatusBar style="light" />
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
    flex: 1,
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
