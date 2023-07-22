import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./Screen";
import BackButton from "../components/BackButton";
import ImageFlatList from "../components/ImageFlatList";
import SavedTab from "../routes/SavedTab";
import { NavigationContainer } from "@react-navigation/native";

export default function Saved() {
  return (
    <Screen>
      <BackButton goTo="Favorites" />
      <NavigationContainer independent={true}>
        <SavedTab />
      </NavigationContainer>
    </Screen>
  );
}
