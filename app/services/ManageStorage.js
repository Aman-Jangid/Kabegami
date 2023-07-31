import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import * as ScopedStorage from "react-native-scoped-storage";
import storage from "./storage";
import keys from "../keys";

const { fs } = RNFetchBlob;

const convertToURI = async (path) => {
  const res = await fs.stat(path);
  console.log(res);
};

const selectLocalDirectory = async () => {
  let dir = await ScopedStorage.openDocumentTree(true);
  const res = await fs.stat(dir.uri);

  await storage.setData(keys.DIRECTORY_PATH, res.path);
  return res.path;
};

const selectDirectory = async () => {
  let dir = await ScopedStorage.openDocumentTree(true);
  const res = await fs.stat(dir.uri);

  return res.path;
};

const checkDirectoryExistence = async (folderPath) => {
  return await RNFS.exists(folderPath);
};

const createFolder = async (name, path = null) => {
  const folderPath = path ? path : await selectDirectory();

  createSubFolder(name, folderPath);
};

const createSubFolder = async (childName, parentPath) => {
  const folderPath = parentPath + "/" + childName;
  const folderExists = await checkDirectoryExistence(folderPath);

  if (!folderExists) {
    await RNFS.mkdir(folderPath);
    console.log("User-specified folder created successfully:", folderPath);
  } else {
    console.log("User-specified folder already exists:", folderPath);
  }
  return folderPath;
};

export default {
  createFolder,
  selectDirectory,
  convertToURI,
  checkDirectoryExistence,
  createSubFolder,
  selectLocalDirectory,
};
