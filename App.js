import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./app/routes/AppNavigation";
import { Button, View } from "react-native";
import color from "./app/theme/colors";
import ManageStorage from "./app/services/ManageStorage";
export default function App() {
  // const selectionLocation = async (name) => {
  //   await ManageStorage.createFolder(name);
  // };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: color.colorPrimary,
      }}
    >
      <NavigationContainer>
        <AppNavigation />
        <StatusBar style="light" />
      </NavigationContainer>
    </View>
  );
}
