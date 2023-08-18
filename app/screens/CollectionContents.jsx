import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import LocalImageFlatList from "../components/LocalImageFlatList";
import BackButton from "../components/BackButton";
import ThemeContext from "../theme/ThemeContext";

export default function CollectionContents({ route }) {
  const { color } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      padding: 5,
      width: "100%",
      flex: 1,
      height: "100%",
      backgroundColor: color.colorPrimary,
    },
  });

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo={"Collections"} />
        <LocalImageFlatList data={route.params.items} />
      </View>
    </Screen>
  );
}
