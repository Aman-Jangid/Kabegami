import RNFetchBlob from "rn-fetch-blob";

import storage from "./storage";
import keys from "../keys";
import { Alert } from "react-native";

export default downloadImage = async (url, path = null) => {
  const fileName = url.split("/")[url.split("/").length - 1];

  const customDownloadPath =
    path || (await storage.getData(keys.CURRENT_DOWNLOADS_PATH));
  // const customDownloadPath = path || RNFetchBlob.fs.dirs.DownloadDir;z

  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: customDownloadPath + "/" + fileName,
      description: "File Downloaded",
    },
  })
    .fetch("GET", url)
    .then((res) => {
      // File has been downloaded and saved successfully
      console.log("File downloaded successfully.", res.path());
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error downloading file:", error);
      Alert.alert("Error", "Failed to download the file.");
    });
};
