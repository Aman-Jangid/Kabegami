import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PathSelector from "../components/PathSelector";
import Button from "../components/Button";
import Screen from "./Screen";
import { StatusBar } from "expo-status-bar";
import storage from "../services/storage";
import keys from "../keys";
import ManageStorage from "../services/ManageStorage";
import ThemeContext from "../theme/ThemeContext";

export default function Welcome({ navigation }) {
  // initialize async storage pairs
  const initializeAsyncStorage = async () => {
    const likedImagesExist = await storage.getData(keys.LIKED_IMAGES);
    const recentSearchesExist = await storage.getData(keys.RECENT_SEARCHES);
    const collectionsExist = await storage.getData(keys.COLLECTIONS);
    const collectionNamesExist = await storage.getData(keys.COLLECTION_NAMES);
    const tagsExist = await storage.getData(keys.TAGS);
    const localFoldersExist = await storage.getData(keys.LOCAL_FOLDERS);
    const purityExist = await storage.getData(keys.PURITY);
    const apiKeyExist = await storage.getData(keys.API_KEY);
    const themeExist = await storage.getData(keys.THEME);

    if (!themeExist) {
      await storage.setData(keys.THEME, "dark");
    }
    if (!likedImagesExist) {
      await storage.setData(keys.LIKED_IMAGES, []);
    }
    if (!recentSearchesExist) {
      await storage.setData(keys.RECENT_SEARCHES, []);
    }
    if (!collectionsExist) {
      await storage.setData(keys.COLLECTIONS, []);
    }

    if (!collectionNamesExist) {
      await storage.setData(keys.COLLECTION_NAMES, []);
    }
    if (!tagsExist) {
      await storage.setData(keys.TAGS, []);
    }
    if (!localFoldersExist) {
      await storage.setData(keys.LOCAL_FOLDERS, []);
    }
    if (!purityExist) {
      await storage.setData(keys.PURITY, 100);
    }
    if (!apiKeyExist) {
      await storage.setData(keys.API_KEY, "");
    }
  };
  const { color, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    toggleTheme("dark");

    (async () => {
      await ManageStorage.renameFolder(
        await storage.getData(keys.CURRENT_DOWNLOADS_PATH)
      );
    })();

    initializeAsyncStorage();
  }, []);

  const handleConfirm = async () => {
    const downloadPath = await storage.getData(keys.CURRENT_DOWNLOADS_PATH);

    if (downloadPath) {
      navigation.navigate("App");
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: color.colorPrimary,
    },
    logo: {
      height: 150,
      resizeMode: "contain",
    },
    appTitle: {
      paddingVertical: 40,
      fontSize: 50,
      color: color.color9,
    },
    lowerHalf: {
      paddingVertical: 20,
      height: "70%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    description: {
      color: color.color17,
      paddingHorizontal: 15,
    },
    welcomeText: {
      fontSize: 72,
      color: color.color10,
    },
  });

  return (
    <Screen>
      <View style={styles.container}>
        <Image
          source={require("../assets/pictures/kabegami.png")}
          style={styles.logo}
        />
        <View style={styles.lowerHalf}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.description}>
              Please select a directory to store your downloads.
            </Text>
            <PathSelector placeholder="kabegami directory." color={color} />
          </View>
          <Button
            title="continue"
            color={color.color10}
            textColor={color.white}
            onPress={() => handleConfirm()}
            width={380}
          />
        </View>
        <StatusBar style="light" />
      </View>
    </Screen>
  );
}
