import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import ManageStorage from "../services/ManageStorage";
import storage from "../services/storage";
import keys from "../keys";
import uuid from "react-native-uuid";
import FolderFlatlist from "../components/FolderFlatlist";
import ThemeContext from "../theme/ThemeContext";

const addCollection = {
  title: "add_new_collection",
  id: 0,
  collectionImage: "https://th.wallhaven.cc/small/l3/l3zey2.jpg",
};

export default function Local() {
  const [folders, setFolders] = useState([]);
  const [process, setProcess] = useState(false);
  const [info, setInfo] = useState();

  const { color } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    addCollection: {
      backgroundColor: color.color4,
      width: "50%",
      height: 120,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      paddingVertical: 10,
    },
  });

  const addFolderAsync = async (path) => {
    const localFolders = await storage.getData(keys.LOCAL_FOLDERS);
    console.log("path->", path);

    const numberOfImages = 12;

    const folder = {
      title: path.split("/")[path.split("/").length - 1],
      id: uuid.v4(),
      collectionImage: "https://th.wallhaven.cc/small/l3/l3zey2.jpg",
      path,
      numberOfImages,
    };
    if (!localFolders || localFolders?.length === 0) {
      await storage.setData(keys.LOCAL_FOLDERS, [[path]]);

      setFolders([folder]);
      console.log(folders);
    } else {
      const newLocalFolders = [...localFolders, folder];
      await storage.setData(keys.LOCAL_FOLDERS, newLocalFolders);
    }
  };

  const getFoldersAsync = async () => {
    const data = await storage.getData(keys.LOCAL_FOLDERS);
    const filteredData = data.filter((value) => value || !isFinite(value));
    filteredData.unshift(addCollection);
    setFolders(filteredData);
  };

  const getFolderContents = async () => {
    const pathsRes = await storage.getData(keys.LOCAL_FOLDERS);
    const paths = new Set(pathsRes.filter((path) => path));
    console.log(paths);
  };

  useEffect(() => {
    getFoldersAsync();
  }, []);

  useEffect(() => {
    // getFolderContents();
    if (process) {
      getFoldersAsync();
    }

    return () => setProcess(false);
  }, [process]);

  // choose a folder from local storage (external storage)
  const handleAddFolder = async () => {
    const path = await ManageStorage.selectDirectory(true);

    setProcess(true);
    await addFolderAsync(path);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <FolderFlatlist
          color={color}
          data={folders}
          handleAdd={handleAddFolder}
          onItemPress={(path) => console.log(path)}
        />
      </View>
    </Screen>
  );
}
