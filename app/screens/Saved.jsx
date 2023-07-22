import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import BackButton from "../components/BackButton";
import ImageFlatList from "../components/ImageFlatList";
import SavedTab from "../routes/SavedTab";
import { NavigationContainer } from "@react-navigation/native";

export default function Saved() {
  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Favorites" />
        <NavigationContainer independent={true}>
          <SavedTab />
        </NavigationContainer>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});
