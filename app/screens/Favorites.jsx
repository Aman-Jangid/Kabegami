import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageFlatList from "../components/ImageFlatList";
import color from "../theme/colors";
import ImageButton from "../components/ImageButton";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Screen from "./Screen";
import storage from "../services/storage";
import keys from "../keys";
import IconButton from "../components/IconButton";

export default function Favorites() {
  const isFocused = useIsFocused();
  const [wallpapers, setWallpapers] = useState([]);
  const [selections, setSelections] = useState([]);
  const [select, setSelect] = useState(false);

  const getImages = async () => {
    const images = await storage.getData(keys.LIKED_IMAGES);
    setWallpapers(images);
  };

  useEffect(() => {
    getImages();
  }, [isFocused]);

  const { navigate } = useNavigation();

  const toggleSelection = () => {
    setSelect(!select);
  };

  const emptyFavorites = async () => {
    setWallpapers([]);
    await storage.setData(keys.LIKED_IMAGES, []);
  };

  const removeSelected = async () => {
    const filteredWallpapers = wallpapers.filter(
      (wallpaper) => !selections.includes(wallpaper.id)
    );

    setWallpapers(filteredWallpapers);
    setSelect(false);
    await storage.setData(keys.LIKED_IMAGES, filteredWallpapers);
  };

  const handleNavigation = (to) => {
    navigate(to);
  };

  const handleSelections = (item) => {
    const tempSelectedItems = [...selections];

    if (tempSelectedItems.includes(item)) {
      console.log("already includes");
      const filteredItems = tempSelectedItems.filter((value) => value !== item);
      setSelections(filteredItems);
    } else {
      tempSelectedItems.push(item);
      setSelections(tempSelectedItems);
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.paths}>
          <ImageButton
            height={60}
            imageHeight={60}
            title="collections"
            background={require("../assets/pictures/anime.jpg")}
            onPress={() => handleNavigation("Collections")}
          />
          <ImageButton
            height={60}
            imageHeight={60}
            title="saved"
            background={require("../assets/pictures/new.jpg")}
            onPress={() => handleNavigation("SavedTab")}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Favorites</Text>
          <View style={styles.divider}></View>
          <IconButton
            name={"checkbox-multiple-marked-outline"}
            iconPack={"MCI"}
            size={25}
            style={{ paddingRight: 2 }}
            color={color.color9}
            onPress={toggleSelection}
          />
          <IconButton
            name={select ? "heart-dislike" : "delete"}
            iconPack={select ? "II" : "MI"}
            size={25}
            style={{ paddingRight: 10 }}
            color={color.color9}
            onPress={select ? removeSelected : emptyFavorites}
          />
        </View>
        <ImageFlatList
          data={wallpapers}
          select={select}
          selections={selections}
          setSelections={handleSelections}
        />
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
