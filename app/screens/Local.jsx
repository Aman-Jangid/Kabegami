import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";

export default function Local() {
  return (
    <Screen>
      <View style={styles.container}></View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});
