import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "./Screen";
import LocalImageFlatList from "../components/LocalImageFlatList";
import keys from "../keys";
import RNFetchBlob from "rn-fetch-blob";
import storage from "../services/storage";
import { useIsFocused } from "@react-navigation/native";
import folderInfo from "../services/folderInfo";
import ThemeContext from "../theme/ThemeContext";

export default function Downloaded() {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const directory = RNFetchBlob.fs.dirs.DownloadDir;

  const { color } = useContext(ThemeContext);

  const getDir = async () => {
    const downloads = await storage.getData(keys.DOWNLOADS_PATH);
    const hiddenDownloads = await storage.getData(keys.HIDDEN_DOWNLOADS_PATH);
    getWallpapers([downloads, hiddenDownloads]);
    // getWallpapers(["/storage/emulated/0/Download"]);
  };

  const getWallpapers = async (dirs) => {
    const infoA = await folderInfo.get(dirs[0]);
    const infoB = await folderInfo.get(dirs[1]);
    // const info = await folderInfo.get(dirs[0]);
    // setData([...info]);
    setData([...infoA, ...infoB]);
  };

  useEffect(() => {
    getDir();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <LocalImageFlatList color data={data} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
