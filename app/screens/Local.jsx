import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import color from "../theme/colors";
import ManageStorage from "../services/ManageStorage";
import storage from "../services/storage";
import keys from "../keys";
import FolderFlatlist from "../components/FolderFlatlist";

const localFolders = [
  {
    title: "add_new_collection",
    id: 0,
    collectionImage: "https://th.wallhaven.cc/small/l3/l3zey2.jpg",
  },
  {
    title: "My-Images",
    id: 1,
    collectionImage: "https://th.wallhaven.cc/small/01/01dl3g.jpg",
    numberOfImages: 43,
  },
  {
    title: "dark-wallpapers",
    id: 1,
    collectionImage: "https://th.wallhaven.cc/small/l3/l3zey2.jpg",
    numberOfImages: 343,
  },
];

export default function Local() {
  const [folderPath, setFolderPath] = useState();
  const [folders, setFolders] = useState([]);
  const [info, setInfo] = useState();

  const addFolderAsync = async () => {
    const localFolders = await storage.getData(keys.LOCAL_FOLDERS);

    if (!localFolders) {
      await storage.setData(keys.LOCAL_FOLDERS, [folderPath]);
    } else {
      const newLocalFolders = [...localFolders, folderPath];
      await storage.setData(keys.LOCAL_FOLDERS, newLocalFolders);
    }
  };

  useEffect(() => {
    console.log(folders);
  }, [folders]);

  const getFolderContents = async () => {
    const pathsRes = await storage.getData(keys.LOCAL_FOLDERS);
    const paths = new Set(pathsRes.filter((path) => path));
    setFolders(Array.from(paths));
    // const info = await folderInfo.get(folders[1], true);
    // setInfo(info);
  };

  useEffect(() => {
    getFolderContents();
  }, [folderPath]);

  // choose a folder from local storage (external storage)
  const handleAddFolder = async () => {
    const path = await ManageStorage.selectDirectory(true);
    setFolderPath(path);

    await addFolderAsync();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <FolderFlatlist data={localFolders} />
      </View>
    </Screen>
  );
}
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
