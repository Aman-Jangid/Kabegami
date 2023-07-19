import React from "react";
import { StyleSheet, View } from "react-native";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import Button from "../components/Button";
import color from "../theme/colors";

export default function Customize() {
  return (
    <View style={styles.container}>
      <DropDownMenu />
      <Input />
      <Input lines={10} />
      <Button title="confirm" color={color.white} width="80%" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: color.lightGrey,
    height: "100%",
    width: "100%",
  },
});
