import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import LocalImageFlatList from "../components/LocalImageFlatList";
import values from "../values";

export default function Downloaded() {
  return (
    <Screen>
      <View style={styles.container}>
        <LocalImageFlatList dir={values.DOWNLOADS_PATH} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});
