import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import * as ScopedStorage from "react-native-scoped-storage";
import storage from "./storage";

const { fs } = RNFetchBlob;

const selectDirectory = async () => {
  let dir = await ScopedStorage.openDocumentTree(true);
  const res = await fs.stat(dir.uri);
  await storage.setData("DIRECTORY_PATH", res.path);

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

export default { createFolder, selectDirectory };
