import React from "react";
import { StyleSheet, View } from "react-native";

import IconButton from "./IconButton";
import Search from "./Search";

export default function SearchBar({
  searching,
  handleSearch,
  handleBack,
  color,
}) {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.container}>
      <IconButton
        name={!searching ? "circle-thin" : "chevron-with-circle-left"}
        iconPack={!searching ? "FAI" : "EI"}
        size={!searching ? 32 : 28}
        color={!searching ? color.color3 : color.color9}
        onPress={handleBack}
      />
      <Search color={color} textChangeHandle={handleSearch} />
    </View>
  );
}
