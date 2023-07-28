import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import ImageButton from "../components/ImageButton";
import Screen from "./Screen";
import color from "../theme/colors";
import BackButton from "../components/BackButton";
import Icon from "../components/Icon";
import storage from "../services/storage";
import ManageStorage from "../services/ManageStorage";
import values from "../values";
import CollectionCreator from "../components/CollectionCreator";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [directory, setDirectory] = useState(null);
  const [showCreator, setShowCreator] = useState(false);
  const [syncNow, setSyncNow] = useState(false);

  const getCollectionsAsync = async () => {
    const data = await storage.getData(values.COLLECTIONS);

    if (!data) {
      await storage.setData(values.COLLECTIONS, [
        {
          title: "add_new_collection",
          id: 0,
        },
      ]);

      await storage.setData(values.COLLECTION_NAMES, []);

      const data = await storage.getData(values.COLLECTIONS);

      setCollections(data);
    }
    if (data) {
      setCollections(data);

      const nameData = await storage.getData(values.COLLECTION_NAMES);

      const newNameArray = [];

      collections.map((collection) => {
        if (collection.title !== "add_new_collection") {
          newNameArray.push(collection.title);
        }
      });

      if (newNameArray.length !== nameData.length) {
        await storage.setData(values.COLLECTION_NAMES, newNameArray);
      }
    } else if (!collections.length) {
      collections.push({ title: "add_new_collection", id: 0 });
      storage.setData(values.COLLECTIONS, collections);
    }
  };

  const createFolder = async () => {
    const path = await storage.getData(values.COLLECTIONS_PATH);

    // check if directory exist -> if yes return
    const exists = await ManageStorage.checkDirectoryExistence(path);

    if (
      exists &&
      path.split("/")[path.split("/").length - 1] === ".Collections"
    ) {
      console.log("exists");
      setDirectory(path);
    } else {
      const collectionsPath = await ManageStorage.createFolder(
        ".Collections",
        path
      );

      await storage.setData(values.COLLECTIONS_PATH, collectionsPath);

      const location = await storage.getData(values.COLLECTIONS_PATH);
      console.log("Folder has been created at -> ", location);
      setDirectory(collectionsPath);
    }
  };

  useEffect(() => {
    getCollectionsAsync();
    createFolder();

    (async () => {
      const data = await storage.getData(values.COLLECTION_NAMES);
      console.log(data);
    })();
  }, []);

  useEffect(() => {
    getCollectionsAsync();

    // cleanup
    return () => {
      setSyncNow(false);
    };
  }, [syncNow]);

  const handleAddCollection = async (item) => {
    const newCollections = [...collections];
    newCollections.pop();

    await storage.addArrayData(values.COLLECTIONS, item);

    if (item) {
      newCollections.push(item);
      newCollections.push({ title: "add_new_collection", id: 0 });
      setCollections([...newCollections]);
      await storage.addArrayData(values.COLLECTION_NAMES, item.title);
      setSyncNow(true);

      // if (!data || data.length !== collections.length) {
      // await storage.setData(collections.map((col) => col.title));
      // } else {
      // }
    } else return;
  };

  // const setCollectionNameArray = async (item) => {
  //   const data = storage.getData(values.COLLECTION_NAMES);
  //   if (!data) {
  //     await storage.setData(collections.map((col) => col.title));
  //   } else {
  //     await storage.addArrayData(values.COLLECTION_NAMES,item)
  //   }
  // };

  const handleConfirm = async (item) => {
    setShowCreator(false);
    handleAddCollection(item);
  };

  const handleExit = () => {
    setShowCreator(false);
  };

  return (
    <Screen>
      <View style={styles.container}>
        {showCreator && (
          <CollectionCreator
            handleExit={handleExit}
            handleConfirm={handleConfirm}
          />
        )}
        <BackButton goTo="Favorites" />
        <FlatList
          numColumns={2}
          data={collections}
          renderItem={({ item }) => {
            if (item.title !== "add_new_collection") {
              return (
                <ImageButton
                  uri={item.collectionImage}
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
                  onPress={() => setShowCreator(true)}
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
    padding: 5,
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
