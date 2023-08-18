import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import keys from "../keys";
import storage from "../services/storage";
import Screen from "./Screen";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import PathSelector from "../components/PathSelector";
import SavingChanges from "../components/SavingChanges";
import ManageStorage from "../services/ManageStorage";
import ThemeContext from "../theme/ThemeContext";

export default function Settings() {
  // context
  const { color, toggleTheme } = useContext(ThemeContext);

  const [downloadHidden, setDownloadsHidden] = useState(false);
  const [saving, setSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [downloadDir, setDownloadDir] = useState("");

  const getButtonState = async () => {
    const currentDownloadsPath = await storage.getData(
      keys.CURRENT_DOWNLOADS_PATH
    );
    const currentTheme = await storage.getData(keys.THEME);
    setDarkMode(currentTheme === "dark" ? true : false);
    setDownloadDir(currentDownloadsPath);

    if (
      currentDownloadsPath.split("/")[
        currentDownloadsPath.split("/").length - 1
      ] === ".Downloads"
    ) {
      setDownloadsHidden(true);
    } else setDownloadsHidden(false);
  };

  const handleConfirm = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  const setLightTheme = async () => {
    toggleTheme("light");
    setDarkMode(false);
    await storage.setData(keys.THEME, "light");
  };

  const setDarkTheme = async () => {
    toggleTheme("dark");
    setDarkMode(true);
    await storage.setData(keys.THEME, "dark");
  };

  const hideDownloads = async () => {
    setDownloadsHidden(true);

    const hiddenDir = await storage.getData(keys.HIDDEN_DOWNLOADS_PATH);

    await storage.setData(keys.CURRENT_DOWNLOADS_PATH, hiddenDir);
    setDownloadDir(hiddenDir);

    // rename folder to weeeeeeeeeee
    await ManageStorage.renameFolder(hiddenDir, "weeeeeeeeeeee");
  };

  const showDownloads = async () => {
    setDownloadsHidden(false);

    const visibleDir = await storage.getData(keys.DOWNLOADS_PATH);

    await storage.setData(keys.CURRENT_DOWNLOADS_PATH, visibleDir);

    setDownloadDir(visibleDir);
  };

  useEffect(() => {}, [downloadHidden]);

  useEffect(() => {
    getButtonState();
  }, []);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.colorPrimary,
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    setting: {
      marginVertical: 15,
      width: "100%",
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    settingText: {
      width: "50%",
      fontSize: 16,
      color: color.color6,
    },
    buttonContainer: {
      flexDirection: "row",
      borderRadius: 10,
      overflow: "hidden",
    },
    confirmButton: {
      width: "100%",
      alignItems: "center",
      marginBottom: 15,
    },
    downloadsDir: {
      width: "90%",
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

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Home" />
        <PathSelector color={color} placeholder="kabegami directory" />
        <View style={styles.confirmButton}>
          <Button
            title="confirm directory"
            color={color.color10}
            textColor={color.color8}
            width="90%"
            onPress={handleConfirm}
            disabled={saving}
          />
        </View>
        <Text style={[styles.settingText, { width: "90%" }]}>
          Current downloads directory :
        </Text>
        <TextInput style={styles.downloadsDir} value={downloadDir} />
        <View style={styles.setting}>
          <Text style={styles.settingText}>
            Show Downloads in {"\n"}Image gallery :
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="hide"
              color={downloadHidden ? color.color10 : color.color2}
              textColor={downloadHidden ? color.lightGrey : color.color10}
              onPress={hideDownloads}
              border={false}
            />
            <Button
              title={"show"}
              color={downloadHidden ? color.color2 : color.color10}
              textColor={downloadHidden ? color.color10 : color.lightGrey}
              onPress={showDownloads}
              border={false}
            />
          </View>
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>App theme :</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Dark"
              color={darkMode ? color.color10 : color.color2}
              textColor={darkMode ? color.lightGrey : color.color10}
              onPress={setDarkTheme}
              border={false}
            />
            <Button
              title={"light"}
              color={darkMode ? color.color2 : color.color10}
              textColor={darkMode ? color.color10 : color.lightGrey}
              onPress={setLightTheme}
              border={false}
            />
          </View>
        </View>
      </View>
      {saving && <SavingChanges />}
    </Screen>
  );
}
