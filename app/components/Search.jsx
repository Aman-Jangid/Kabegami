import React, { useEffect, useRef, useState } from "react";
import { Alert, TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

export default function Search({ textChangeHandle }) {
  const [value, setValue] = useState();

  const searchIconStyles = {
    backgroundColor: color.lightGrey,
  };

  const handleSearch = () => {
    textChangeHandle(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => setValue(value)}
        style={styles.search}
        value={value}
      />
      <View style={styles.searchIcon}>
        <IconButton
          style={searchIconStyles}
          name="image-search"
          color={color.grey}
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
  },
  search: {
    flex: 1,
    padding: 5,
    paddingHorizontal: 15,
    fontSize: 18,
    color: color.grey,
    borderRadius: 15,
    fontWeight: "bold",
    backgroundColor: color.lightGrey,
  },
  searchIcon: {
    backfaceVisibility: "hidden",
    position: "absolute",
    right: 4,
  },
});
