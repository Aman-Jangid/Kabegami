import React, { useEffect, useRef, useState } from "react";
import { Alert, Keyboard, TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

export default function Search({ textChangeHandle }) {
  const [value, setValue] = useState();

  const searchIconStyles = {
    backgroundColor: color.color3,
  };

  const handleSearch = () => {
    if (!value) return;
    textChangeHandle(value);
    Keyboard.dismiss();
    setValue(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onSubmitEditing={handleSearch}
        placeholder="Search"
        placeholderTextColor={color.color5}
        onChangeText={(value) => setValue(value)}
        style={styles.search}
        value={value}
      />
      <View style={styles.searchIcon}>
        <IconButton
          style={searchIconStyles}
          name="image-search"
          color={color.color10}
          size={33}
          iconPack="MI"
          onPress={handleSearch}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    marginRight: 25,
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 15,
  },
  search: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 15,
    fontSize: 20,
    color: color.color7,
    letterSpacing: 1.4,
    fontWeight: "bold",
    backgroundColor: color.color3,
  },
  searchIcon: {
    backfaceVisibility: "hidden",
    position: "absolute",
    right: 4,
  },
});
