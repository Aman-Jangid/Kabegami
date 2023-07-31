import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import keys from "../keys";
import color from "../theme/colors";
import storage from "../services/storage";
import Screen from "./Screen";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import PathSelector from "../components/PathSelector";
import SavingChanges from "../components/SavingChanges";
import ButtonSelection from "../components/ButtonSelection";

export default function Settings() {
  const [useCustomDir, setUseCustomDir] = useState(false);
  const [saving, setSaving] = useState(false);

  const getButtonState = async () => {
    const downloadPath = await storage.getData(keys.DOWNLOADS_PATH);
    if (
      downloadPath.split("/")[downloadPath.split("/").length - 1] ===
      ".Downloads"
    ) {
      setUseCustomDir(true);
    } else setUseCustomDir(false);
  };

  const setDownloadDirectory = async () => {
    const path = await storage.getData(keys.DIRECTORY_PATH);
    if (!useCustomDir) {
      await storage.setData(keys.DOWNLOADS_PATH, path + "/Downloads");
    } else {
      await storage.setData(keys.DOWNLOADS_PATH, path + "/.Downloads");
    }
  };

  useEffect(() => {
    setDownloadDirectory();
  }, [useCustomDir]);

  const handleUseCustomDownloadDir = async () => {
    setUseCustomDir(!useCustomDir);
  };

  const handleConfirm = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  useEffect(() => {
    getButtonState();
  }, []);

  const selections = [
    { title: "dark", color: color.color3, text: color.color8 },
    { title: "light", color: color.color8, text: color.color3 },
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Home" />
        <PathSelector placeholder="kabegami directory" />
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
        <ButtonSelection options={selections} />
        <Button
          title="confirm"
          color={color.color10}
          textColor={color.white}
          width="90%"
          onPress={() => handleConfirm()}
        />
      </View>
      {saving && <SavingChanges />}
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
