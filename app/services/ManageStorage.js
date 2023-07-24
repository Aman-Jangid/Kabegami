import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import * as ScopedStorage from "react-native-scoped-storage";
import storage from "./storage";
import values from "../values";

const { fs } = RNFetchBlob;

const convertToURI = async (path) => {
  const res = await fs.stat(path);
  console.log(res);
};

const selectDirectory = async () => {
  let dir = await ScopedStorage.openDocumentTree(true);
  const res = await fs.stat(dir.uri);
  await storage.setData(values.DIRECTORY_PATH, res.path);

  return res.path;
};

const createFolder = async (name, path = null) => {
  const folderPath = path
    ? path + "/" + name
    : (await selectDirectory()) + "/" + name.trim();
  const folderExists = await RNFS.exists(folderPath);

  if (!folderExists) {
    await RNFS.mkdir(folderPath);
    console.log("User-specified folder created successfully:", folderPath);
  } else {
    console.log("User-specified folder already exists:", folderPath);
  }

  return folderPath;
};

export default { createFolder, selectDirectory, convertToURI };
