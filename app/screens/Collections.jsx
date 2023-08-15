import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import color from "../theme/colors";
import BackButton from "../components/BackButton";
import storage from "../services/storage";
import keys from "../keys";
import CollectionCreator from "../components/CollectionCreator";
import FolderFlatlist from "../components/FolderFlatlist";
import IconButton from "../components/IconButton";
import folderInfo from "../services/folderInfo";

export default function Collections({ navigation }) {
  const [collections, setCollections] = useState([
    { id: 0, title: "add_new_collection" },
  ]);
  const [showCreator, setShowCreator] = useState(false);
  const [syncNow, setSyncNow] = useState(false);
  const [foldersContent, setFoldersContent] = useState([]);

  const setCollectionNamesAsync = async () => {
    const collectionNames = collections
      .map((collection) => {
        if (collection.path) {
          return {
            title: collection.title,
            path: collection.path,
            quantity: collection.numberOfImages,
          };
        }
      })
      .filter((item) => item);

    await storage.setData(keys.COLLECTION_NAMES, collectionNames);
  };

  const getCollectionAsync = async () => {
    const data = await storage.getData(keys.COLLECTIONS);

    if (!data || data?.length === 0) {
      await storage.setData(keys.COLLECTIONS, [
        { id: 0, title: "add_new_collection" },
      ]);
      setCollections([{ id: 0, title: "add_new_collection" }]);
    } else {
      // setCollections(data);
      await getCollectionsContent(data);
    }
  };

  const setCollectionsAsync = async () => {
    await storage.setData(keys.COLLECTIONS, collections);
  };

  const handleAddCollection = (item) => {
    const newCollections = [...collections];

    if (!item) return;

    newCollections.push(item);
    setCollections([...newCollections]);
    setSyncNow(true);
  };

  const handleConfirm = async (item) => {
    setShowCreator(false);
    handleAddCollection(item);
  };

  const handleExit = () => {
    setShowCreator(false);
  };

  const handleEmpty = async () => {
    // add +collection to collections and storage
    await storage.setData(keys.COLLECTIONS, [
      { id: 0, title: "add_new_collection" },
    ]);
    setCollections([{ id: 0, title: "add_new_collection" }]);

    console.log("emptying");
  };

  const getCollectionsContent = async (data) => {
    const paths = data.map((item) => item.path);

    const dataFromPath = await Promise.all(
      paths.map(async (path) => await folderInfo.get(path))
    );

    const filteredData = dataFromPath.filter((data) => data);
    const numberOfItemsArray = filteredData.map((data) => data.length);

    numberOfItemsArray.unshift(0);

    const collectionsArr = [...data];
    collectionsArr.forEach(
      (collection, i) => (collection.numberOfImages = numberOfItemsArray[i])
    );
    // await storage.setData(keys.COLLECTIONS_PATH,paths)

    setCollections(collectionsArr);

    setFoldersContent(filteredData);
  };

  const handlePress = async (item) => {
    // const index = collections.indexOf(item);
    const parentPath = await storage.getData(keys.COLLECTIONS_PATH);
    const path = parentPath + "/" + item.title;

    const folderItems = await folderInfo.get(path);
    // navigation.navigate("CollectionContents", { items: folderItems });
  };

  useEffect(() => {
    getCollectionAsync();
  }, []);

  useEffect(() => {
    if (syncNow) {
      setCollectionsAsync();
    }

    return () => {
      setSyncNow(false);
    };
  }, [syncNow]);

  useEffect(() => {
    setCollectionNamesAsync();
  }, [collections]);

  return (
    <Screen>
      <View style={styles.container}>
        {showCreator && (
          <CollectionCreator
            handleExit={handleExit}
            handleConfirm={handleConfirm}
          />
        )}
        <View style={styles.header}>
          <BackButton goTo="Favorites" />
          <IconButton
            name="delete"
            color={color.color9}
            iconPack="ADI"
            size={28}
            style={{ marginHorizontal: 5 }}
            onPress={handleEmpty}
          />
        </View>
        <FolderFlatlist
          data={collections}
          onItemPress={handlePress}
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
  header: {
    width: "100%",
    flexDirection: "row",
  },
});
