import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./app/routes/AppNavigation";
import { PermissionsAndroid } from "react-native";
import storage from "./app/services/storage";
import keys from "./app/keys";
import { AsyncProvider } from "./app/context/AsyncContext";
import { ThemeProvider } from "./app/theme/ThemeContext";
import RNFS from "react-native-fs";
import folderInfo from "./app/services/folderInfo";
import RNFetchBlob from "rn-fetch-blob";

export default function App({}) {
  const getPermission = async () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    )
      .then((status) => console.log("Asking for permission !", status))
      .catch((error) => console.log("Failed to ask for permission", error));
  };

  const initializeTags = async () => {
    const tags = [
      {
        background: "https://th.wallhaven.cc/small/k7/k712e7.jpg",
        title: "hot",
        value: "hot",
      },
      {
        background: "https://th.wallhaven.cc/small/gj/gj6xqd.jpg",
        title: "kittens",
        value: "kitten",
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

    const categories = await storage.getData(keys.CATEGORIES);

    if (!categories) {
      console.log("Me called");
      await storage.setData(keys.CATEGORIES, tags);
    }
  };

  useEffect(() => {
    getPermission();
    initializeTags();
  }, []);

  return (
    <ThemeProvider>
      <AsyncProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </AsyncProvider>
    </ThemeProvider>
  );
}
