import React from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

export default function Search({ textChangeHandle }) {
  return (
    <View style={styles.container}>
      <TextInput onChangeText={textChangeHandle} style={styles.search} />
      <View style={styles.searchIcon}>
        <IconButton
          name="image-search"
          color={color.black}
          size={35}
          iconPack="MI"
          onPress={() => console.log("searching")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  search: {
    width: "80%",
    padding: 5,
    paddingHorizontal: 15,
    fontSize: 18,
    color: color.grey,
    borderRadius: 15,
    fontWeight: "bold",
    backgroundColor: color.lightGrey,
  },
  searchIcon: {
    position: "absolute",
    right: 42,
  },
});
