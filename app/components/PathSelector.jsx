import React, { useEffect, useState } from "react";
import { NativeModules, StyleSheet, TextInput, View } from "react-native";

import IconButton from "./IconButton";

import keys from "../keys";
import storage from "../services/storage";
import ManageStorage from "../services/ManageStorage";

export default function PathSelector({ placeholder, color }) {
  const [path, setPath] = useState(null);

  const { FileExplorerModule } = NativeModules;

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      paddingHorizontal: 12,
      width: "100%",
    },
    input: {
      flex: 1,
      alignSelf: "center",
      marginVertical: 10,
      marginHorizontal: 7,
      fontSize: 18,
      borderRadius: 10,
      padding: 5,
      textAlignVertical: "top",
      paddingHorizontal: 10,
      backgroundColor: color.color3,
      color: color.color7,
    },
  });

  // get main directory
  const getMainDirectory = async () => {
    const dir = await storage.getData(keys.DIRECTORY_PATH);
    if (dir) {
      setPath(dir);
    }
  };

  // set main directory
  const selectMainDirectory = async () => {
    const selectedDir = await ManageStorage.selectDirectory();
    setPath(selectedDir);

    // check if directory already exists
    const exists = await ManageStorage.checkDirectoryExistence(selectedDir);
    if (exists) {
      // check if subdirectories exist
      const subDirsExist = await checkSubdirectories(selectedDir);
      // create the subdirectories that do not exist
      await createSubdirectories(subDirsExist, selectedDir);
    }

    // store the selected directory in async storage
    await storage.setData(keys.DIRECTORY_PATH, selectedDir);
    //
  };

  const createSubdirectories = async (code, dir) => {
    if (code[0] === 0) {
      const path = await ManageStorage.createSubFolder(".Collections", dir);
      await storage.setData(keys.COLLECTIONS_PATH, path);
    }
    if (code[1] === 0) {
      const path = await ManageStorage.createSubFolder(".Downloads", dir);
      await storage.setData(keys.HIDDEN_DOWNLOADS_PATH, path);
    }
    if (code[2] === 0) {
      const path = await ManageStorage.createSubFolder("Downloads", dir);
      await storage.setData(keys.DOWNLOADS_PATH, path);
      await storage.setData(keys.CURRENT_DOWNLOADS_PATH, path);
    }
  };

  const checkSubdirectories = async (path) => {
    const collectionsExists = await ManageStorage.checkDirectoryExistence(
      path + "/.Collections"
    );
    const hiddenDownloadsExists = await ManageStorage.checkDirectoryExistence(
      path + "/.Downloads"
    );
    const downloadsExists = await ManageStorage.checkDirectoryExistence(
      path + "/Downloads"
    );

    // set in async storage
    await storage.setData(keys.COLLECTIONS_PATH, path + "/.Collections");
    await storage.setData(keys.DOWNLOADS_PATH, path + "/Downloads");
    await storage.setData(keys.HIDDEN_DOWNLOADS_PATH, path + "/.Downloads");
    await storage.setData(keys.CURRENT_DOWNLOADS_PATH, path + "/.Downloads");

    return [
      collectionsExists / 1,
      hiddenDownloadsExists / 1,
      downloadsExists / 1,
    ];
  };

  const handleDirectorySelection = async () => {
    await selectMainDirectory();
  };

  const openInExplorer = () => {
    console.log(path);
    // get uri of the path
    FileExplorerModule.openFileExplorer(path);
  };

  useEffect(() => {
    getMainDirectory();
  }, []);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={path}
        style={styles.input}
        multiline
        editable={false}
        placeholder={placeholder}
        placeholderTextColor={color.color5}
      />
      <IconButton
        color={color.color10}
        name="folder-outline"
        iconPack="II"
        size={26}
        onPress={handleDirectorySelection}
        style={{ marginRight: 3 }}
      />
      <IconButton
        color={color.color10}
        name="open-outline"
        iconPack="II"
        size={26}
        onPress={openInExplorer}
      />
    </View>
  );
}
