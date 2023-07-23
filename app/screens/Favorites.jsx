import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageFlatList from "../components/ImageFlatList";
import color from "../theme/colors";
import ImageButton from "../components/ImageButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Screen from "./Screen";
import storage from "../services/storage";

export default function Favorites() {
  const isFocused = useIsFocused();
  const [wallpapers, setWallpapers] = useState([]);

  const getImages = async () => {
    const images = await storage.getData("LIKED_IMAGES");
    setWallpapers(images);
  };

  useEffect(() => {
    getImages();
  }, [isFocused]);

  const { navigate } = useNavigation();

  const handleNavigation = (to) => {
    navigate(to);
  };
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.paths}>
          <ImageButton
            width={"48%"}
            height={60}
            title="collections"
            background={require("../assets/pictures/anime.jpg")}
            onPress={() => handleNavigation("Collections")}
          />
          <ImageButton
            width={"48%"}
            height={60}
            title="saved"
            background={require("../assets/pictures/new.jpg")}
            onPress={() => handleNavigation("SavedTab")}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Favorites</Text>
          <View style={styles.divider}></View>
        </View>
        <ImageFlatList data={wallpapers} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.colorPrimary,
    // paddingTop: 40,
    flex: 1,
    height: "100%",
    width: "100%",
  },
  paths: {
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 10,
    width: "100%",
    justifyContent: "space-evenly",
  },
  labelContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  divider: {
    marginRight: 10,
    borderRadius: 50,
    alignSelf: "center",
    flex: 1,
    height: 3,
    backgroundColor: color.color9,
    marginBottom: -5,
  },
  label: {
    color: color.color9,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
