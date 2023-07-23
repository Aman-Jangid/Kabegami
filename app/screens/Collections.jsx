import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import ImageButton from "../components/ImageButton";
import Screen from "./Screen";
import color from "../theme/colors";
import BackButton from "../components/BackButton";
import Icon from "../components/Icon";
import storage from "../services/storage";
import ManageStorage from "../services/ManageStorage";

const collectionsArray = [
  {
    title: "T5",
    collectionImage: require("../assets/pictures/top.jpg"),
    numberOfImages: 16,
    id: 1,
  },
  {
    title: "Wlop",
    collectionImage: require("../assets/pictures/new.jpg"),
    numberOfImages: 51,
    id: 2,
  },
  {
    title: "OnePiece Fanarts",
    collectionImage: require("../assets/pictures/anime.jpg"),
    numberOfImages: 72,
    id: 3,
  },
  {
    title: "SlideShow",
    collectionImage: require("../assets/pictures/nature.jpg"),
    numberOfImages: 32,
    id: 4,
  },
  {
    title: "Kittens",
    collectionImage: require("../assets/pictures/cats.jpg"),
    numberOfImages: 131,
    id: 5,
  },
  { title: "add_new_collection", id: 99 },
];

export default function Collections() {
  const [collections, setCollections] = useState(collectionsArray);
  const [parentDir, setParentDir] = useState(null);
  const [collectionDir, setCollectionDir] = useState(null);
  const [directory, setDirectory] = useState(null);
  // const getData = async () => {
  // setDirectory(path);
  // };

  const createFolder = async (name) => {
    const path = await storage.getData("DIRECTORY_PATH");
    ManageStorage.createFolder(name, path);
    setDirectory(path + "/" + name);
  };

  useEffect(() => {
    createFolder(".Collections");
  }, []);

  const newItem = {
    title: "OnePiece Fanarts",
    collectionImage: require("../assets/pictures/anime.jpg"),
    numberOfImages: 72,
    id: 3,
  };

  const handleAddCollection = () => {
    const newCollections = [...collections];
    newCollections.pop();
    newCollections.push(newItem);
    newCollections.push({ title: "add_new_collection", id: 99 });

    setCollections([...newCollections]);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Favorites" />
        <FlatList
          numColumns={2}
          data={collections}
          renderItem={({ item }) => {
            if (item.title !== "add_new_collection") {
              return (
                <ImageButton
                  background={item.collectionImage}
                  title={item.title}
                  width={"48%"}
                  height={100}
                  quantity={item.numberOfImages}
                  collection
                />
              );
            } else
              return (
                <TouchableOpacity
                  onPress={handleAddCollection}
                  style={styles.addCollection}
                >
                  <Icon
                    name="plus"
                    iconPack="EI"
                    color={color.color6}
                    size={80}
                  />
                </TouchableOpacity>
              );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    width: "100%",
    flex: 1,
    height: "100%",
    backgroundColor: color.colorPrimary,
  },
  addCollection: {
    width: "48%",
    borderRadius: 10,
    margin: 5,
    height: 100,
    backgroundColor: color.color4,
    alignItems: "center",
    justifyContent: "center",
  },
});
