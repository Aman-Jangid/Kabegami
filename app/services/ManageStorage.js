import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import * as ScopedStorage from "react-native-scoped-storage";

const { fs } = RNFetchBlob;

const selectDirectory = async () => {
  let dir = await ScopedStorage.openDocumentTree(true);
  const res = await fs.stat(dir.uri);
  return res.path;
};

const createFolder = async (name) => {
  // const { fs } = RNFetchBlob;
  // // returns uri to selected directory
  // let dir = await ScopedStorage.openDocumentTree(true);
  // // returns path and other properties
  // const res = await fs.stat(dir.uri);

  const folderPath = (await selectDirectory()) + "/" + name.trim();
  const folderExists = await RNFS.exists(folderPath);

  if (!folderExists) {
    await RNFS.mkdir(folderPath);
    console.log("User-specified folder created successfully:", folderPath);
  } else {
    console.log("User-specified folder already exists:", folderPath);
  }
};

export default { createFolder, selectDirectory };
