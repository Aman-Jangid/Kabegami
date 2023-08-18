import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

export default function FlatlistHeader({
  onPress,
  title,
  icon = "delete",
  iconPack = "ADI",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.recentText}>{title}</Text>
      <IconButton
        name={icon}
        iconPack={iconPack}
        size={25}
        color={color.color6}
        onPress={onPress}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  recentText: {
    fontSize: 18,
    color: color.color5,
  },
});
