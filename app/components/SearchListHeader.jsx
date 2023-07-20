import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import color from "../theme/colors";

export default function SearchListHeader({ onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.recentText}>Recent Searches</Text>
      <IconButton
        name="delete"
        iconPack="ADI"
        size={25}
        color={color.grey}
        onPress={onPress}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between" },
  recentText: {
    fontSize: 18,
    color: color.grey2,
  },
});
