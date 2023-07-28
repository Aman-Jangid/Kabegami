import { Alert } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
// import { DownloadDirectoryPath, dirs } from "react-native-fs";
import storage from "./storage";
import values from "../values";

export default downloadImage = async (url) => {
  const fileName = url.split("/")[url.split("/").length - 1];

  const customDownloadPath = await storage.getData(values.DOWNLOADS_PATH);

  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: customDownloadPath + "/" + fileName,
      // ? `${customDownloadPath}/${fileName}`
      // : `${DownloadDirectoryPath}/${fileName}`,
      description: "File Downloaded",
    },
  })
    .fetch("GET", url)
    .then((res) => {
      // File has been downloaded and saved successfully
      console.log("File downloaded successfully.", res.path());
      Alert.alert("Success", "File downloaded successfully.");
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error downloading file:", error);
      Alert.alert("Error", "Failed to download the file.");
    });
};
