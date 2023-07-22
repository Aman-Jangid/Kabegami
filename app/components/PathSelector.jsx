import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Input from "./Input";
import IconButton from "./IconButton";
import color from "../theme/colors";

export default function PathSelector({ path, placeholder, onPress }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={path}
        style={styles.input}
        multiline
        placeholder={placeholder}
        placeholderTextColor={color.color5}
      />
      <IconButton
        color={color.color10}
        name="folder-outline"
        iconPack="II"
        size={26}
        onPress={onPress}
      />
    </View>
  );
}
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
