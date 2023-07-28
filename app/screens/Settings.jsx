import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import color from "../theme/colors";
import BackButton from "../components/BackButton";
import Screen from "./Screen";
import PathSelector from "../components/PathSelector";
import ManageStorage from "../services/ManageStorage";
import storage from "../services/storage";
import values from "../values";

export default function Settings() {
  const [path, setPath] = useState(null);
  const [useCustomDir, setUseCustomDir] = useState(false);

  const getButtonState = async () => {
    const downloadPath = await storage.getData(values.DOWNLOADS_PATH);
    if (
      downloadPath.split("/")[downloadPath.split("/").length - 1] ===
      ".Downloads"
    ) {
      setUseCustomDir(true);
    } else setUseCustomDir(false);
  };

  const getMainDirectory = async () => {
    const path = await storage.getData(values.DIRECTORY_PATH);
    setPath(path);
  };

  const setDownloadDirectory = async () => {
    const path = await storage.getData(values.DIRECTORY_PATH);
    if (!useCustomDir) {
      await storage.setData(values.DOWNLOADS_PATH, path + "/Downloads");
    } else {
      await storage.setData(values.DOWNLOADS_PATH, path + "/.Downloads");
    }
  };

  useEffect(() => {
    setDownloadDirectory();
  }, [useCustomDir]);

  const handleUseCustomDownloadDir = async () => {
    setUseCustomDir(!useCustomDir);
  };

  const setLocalImagesDirectory = () => {};

  useEffect(() => {
    getButtonState();
    getMainDirectory();
  }, []);

  const handleDirectorySelection = async () => {
    if (path) return;
    // select main directory
    const path = await ManageStorage.selectDirectory();
    const mainPath = await ManageStorage.createFolder("Kabegami", path);
    await storage.setData(values.DIRECTORY_PATH, mainPath);
    setPath(mainPath);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Home" />
        <PathSelector
          path={path}
          placeholder="kabegami directory"
          onPress={handleDirectorySelection}
        />
        <View style={styles.DownloadPathSelection}>
          <Button
            title={
              useCustomDir
                ? "SHOW DOWNLOADS IN GALLERY"
                : "HIDE DOWNLOADS IN GALLERY"
            }
            color={useCustomDir ? color.color2 : color.color10}
            textColor={useCustomDir ? color.color10 : color.color2}
            onPress={handleUseCustomDownloadDir}
          />
        </View>
        <Button
          title="confirm"
          color={color.color10}
          textColor={color.white}
          width="90%"
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.colorPrimary,
    alignItems: "center",
    // paddingTop: 50,
    height: "100%",
    width: "100%",
  },
  DownloadPathSelection: {
    margin: 10,
    marginBottom: 20,
  },
});
