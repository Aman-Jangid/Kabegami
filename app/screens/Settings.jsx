import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import Button from "../components/Button";
import color from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/IconButton";
import ButtonSelection from "../components/ButtonSelection";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";
import Screen from "./Screen";
import PathSelector from "../components/PathSelector";
import ManageStorage from "../services/ManageStorage";

export default function Settings() {
  const [path, setPath] = useState("");

  const handleDirectorySelection = async () => {
    const path = await ManageStorage.selectDirectory();
    setPath(path);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Home" />
        <PathSelector
          path={path}
          placeholder="select kabegami directory"
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
