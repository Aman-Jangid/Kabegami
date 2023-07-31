import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import LocalImageFlatList from "../components/LocalImageFlatList";
import keys from "../keys";

export default function Downloaded() {
  return (
    <Screen>
      <View style={styles.container}>
        <LocalImageFlatList dir={keys.DOWNLOADS_PATH} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});
