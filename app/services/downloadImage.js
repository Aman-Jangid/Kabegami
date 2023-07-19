import React from "react";
import { View, Button, Alert } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { DownloadDirectoryPath, dirs } from "react-native-fs";

export default downloadImage = (url) => {
  const fileName = url.split("/")[url.split("/").length - 1];

  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: `${DownloadDirectoryPath}/${fileName}`,
      description: "File Downloaded",
    },
  })
    .fetch("GET", url)
    .then((res) => {
      // File has been downloaded and saved successfully
      console.log("File downloaded successfully.");
      Alert.alert("Success", "File downloaded successfully.");
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error downloading file:", error);
      Alert.alert("Error", "Failed to download the file.");
    });
};
