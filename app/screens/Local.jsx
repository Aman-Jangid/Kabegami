import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Screen from "./Screen";
import color from "../theme/colors";
import Icon from "../components/Icon";
import ManageStorage from "../services/ManageStorage";
import ImageButton from "../components/ImageButton";
import BackButton from "../components/BackButton";
import storage from "../services/storage";
import values from "../values";
import folderInfo from "../services/folderInfo";

const localFolders = [
  { title: "Import", id: 0 },
  {
    title: "My-Images",
    id: 1,
    background: require("../assets/pictures/anime.jpg"),
    numberOfItems: 43,
  },
  // {
  //   title: "dark-wallpapers",
  //   id: 1,
  //   background: require("../assets/pictures/anime.jpg"),
  //   numberOfItems: 43,
  // },
];

export default function Local() {
  const [folderPath, setFolderPath] = useState();
  const [folders, setFolders] = useState([]);
  const [info, setInfo] = useState();

  const addFolderAsync = async () => {
    const localFolders = await storage.getData(values.LOCAL_FOLDERS);

    if (!localFolders) {
      await storage.setData(values.LOCAL_FOLDERS, [folderPath]);
    } else {
      const newLocalFolders = [...localFolders, folderPath];
      await storage.setData(values.LOCAL_FOLDERS, newLocalFolders);
    }
  };

  useEffect(() => {
    console.log(folders);
  }, [folders]);

  const getFolderContents = async () => {
    const pathsRes = await storage.getData(values.LOCAL_FOLDERS);
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
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={localFolders}
          numColumns={2}
          renderItem={({ item }) =>
            !item.background ? (
              <TouchableOpacity
                onPress={handleAddFolder}
                style={styles.addCollection}
              >
                <Icon
                  name="addfolder"
                  iconPack="ADI"
                  color={color.color6}
                  size={80}
                />
              </TouchableOpacity>
            ) : (
              <ImageButton
                background={item.background}
                width={"48%"}
                title={item.title}
                key={item.id}
                height={115}
              />
            )
          }
          keyExtractor={(item) => item.id}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flatlist: {
    // flexDirection: "row",
    justifyContent: "space-around",
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
