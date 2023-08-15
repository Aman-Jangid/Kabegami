import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import LocalImageFlatList from "../components/LocalImageFlatList";
import keys from "../keys";
import RNFetchBlob from "rn-fetch-blob";
import storage from "../services/storage";
import { useIsFocused } from "@react-navigation/native";
import folderInfo from "../services/folderInfo";

export default function Downloaded() {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const directory = RNFetchBlob.fs.dirs.DownloadDir;

  const getDir = async () => {
    const downloads = await storage.getData(keys.DOWNLOADS_PATH);
    const hiddenDownloads = await storage.getData(keys.HIDDEN_DOWNLOADS_PATH);
    getWallpapers([downloads, hiddenDownloads]);
  };

  const getWallpapers = async (dirs) => {
    const info = await Promise.all(
      dirs.map(async (dir) => await folderInfo.get(dir))
    );
    console.log(info);
    setData(info);
  };

  useEffect(() => {
    getDir();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <LocalImageFlatList data={data} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
