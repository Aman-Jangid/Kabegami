import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./app/routes/AppNavigation";
import { PermissionsAndroid, View } from "react-native";
import color from "./app/theme/colors";
import storage from "./app/services/storage";
import values from "./app/values";
import ManageStorage from "./app/services/ManageStorage";

export default function App({ navigation }) {
  const getPermission = async () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    )
      .then((status) => console.log("Asking for permission !", status))
      .catch((error) => console.log("Failed to ask for permission", error));
  };

  const createFolders = async () => {
    const tags = [
      {
        background: "https://th.wallhaven.cc/small/k7/k712e7.jpg",
        title: "hot",
        value: "hot",
      },
      {
        background: "https://th.wallhaven.cc/small/pk/pkgdvj.jpg",
        title: "anime",
        value: "anime",
      },
      {
        background: "https://th.wallhaven.cc/small/4x/4xkg6z.jpg",
        title: "cars",
        value: "cars",
      },
      {
        background: "https://th.wallhaven.cc/small/v9/v9ylo3.jpg",
        title: "nature",
        value: "nature",
      },
    ];

    const categories = await storage.getData(values.CATEGORIES);

    if (!categories) {
      console.log("Me called");
      await storage.setData(values.CATEGORIES, tags);
    }

    const path = await storage.getData(values.DIRECTORY_PATH);

    await ManageStorage.createFolder(".Collections", path);
    await ManageStorage.createFolder(".Downloads", path);
    await ManageStorage.createFolder("Downloads", path);
  };

  useEffect(() => {
    // folderInfo.get();
    getPermission();
    createFolders();
  }, []);

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
