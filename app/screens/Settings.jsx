import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import color from "../theme/colors";
import BackButton from "../components/BackButton";
import Screen from "./Screen";
import PathSelector from "../components/PathSelector";
import ManageStorage from "../services/ManageStorage";
import storage from "../services/storage";

export default function Settings() {
  const [path, setPath] = useState(null);

  const getSettings = async () => {
    setPath(await storage.getData("PATH"));
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleDirectorySelection = async () => {
    if (path) return;

    const path = await ManageStorage.selectDirectory();
    await storage.setData("PATH", path);
    setPath(path);
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
});
