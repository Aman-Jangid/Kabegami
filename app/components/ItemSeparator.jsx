import React from "react";
import { StyleSheet, View } from "react-native";

export default function ItemSeparator() {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    // width: 300,
    height: 1.5,
    backgroundColor: "black",
  },
});
