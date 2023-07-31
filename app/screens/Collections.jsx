import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import color from "../theme/colors";
import BackButton from "../components/BackButton";
import storage from "../services/storage";
import ManageStorage from "../services/ManageStorage";
import keys from "../keys";
import CollectionCreator from "../components/CollectionCreator";
import FolderFlatlist from "../components/FolderFlatlist";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [directory, setDirectory] = useState(null);
  const [showCreator, setShowCreator] = useState(false);
  const [syncNow, setSyncNow] = useState(false);

  const getCollectionsAsync = async () => {
    const data = await storage.getData(keys.COLLECTIONS);

    if (!data) {
      await storage.setData(keys.COLLECTIONS, [
        {
          title: "add_new_collection",
          id: 0,
        },
      ]);

      await storage.setData(keys.COLLECTION_NAMES, []);

      const data = await storage.getData(keys.COLLECTIONS);

      setCollections(data);
    }
    if (data) {
      setCollections(data);

      const nameData = await storage.getData(keys.COLLECTION_NAMES);

      const newNameArray = [];

      collections.map((collection) => {
        if (collection.title !== "add_new_collection") {
          newNameArray.push(collection.title);
        }
      });

      if (newNameArray.length !== nameData.length) {
        await storage.setData(keys.COLLECTION_NAMES, newNameArray);
      }
    } else if (!collections.length) {
      collections.push({ title: "add_new_collection", id: 0 });
      storage.setData(keys.COLLECTIONS, collections);
    }
  };

  const createFolder = async () => {
    const path = await storage.getData(keys.COLLECTIONS_PATH);

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

      await storage.setData(keys.COLLECTIONS_PATH, collectionsPath);

      const location = await storage.getData(keys.COLLECTIONS_PATH);
      console.log("Folder has been created at -> ", location);
      setDirectory(collectionsPath);
    }
  };

  useEffect(() => {
    getCollectionsAsync();
    createFolder();

    (async () => {
      const data = await storage.getData(keys.COLLECTION_NAMES);
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

    await storage.addArrayData(keys.COLLECTIONS, item);

    if (item) {
      newCollections.push(item);
      newCollections.push({ title: "add_new_collection", id: 0 });
      setCollections([...newCollections]);
      await storage.addArrayData(keys.COLLECTION_NAMES, item.title);
      setSyncNow(true);
    } else return;
  };

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
        <FolderFlatlist
          data={collections}
          handleAdd={() => setShowCreator(true)}
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
});
