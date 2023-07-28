import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "./IconButton";

export default function Input({
  lines,
  backgroundColor,
  color,
  placeholder,
  placeholderColor,
  iconName = "help-circle-outline",
  iconColor,
  displayHelp,
  toggleLink,
  handleChange,
  value,
}) {
  const handleTextChange = (value) => {
    handleChange(value);
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={(value) => handleTextChange(value)}
        style={[styles.input, { backgroundColor, color }]}
        multiline
        numberOfLines={lines}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
      />
      {displayHelp && (
        <IconButton
          color={iconColor}
          name={iconName}
          iconPack="II"
          size={35}
          onPress={toggleLink}
        />
      )}
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
  },
});
