import RNFS from "react-native-fs";
import storage from "./storage";

const get = async (directory) => {
  const fileExtensions = ["jpg", "jpeg", "png", "webm"];
  // const folderPath = await storage.getData(directory);
  const folderPath = directory;

  try {
    const items = await RNFS.readDir(folderPath);
    const folderItems = await Promise.all(
      items.map(async (item) => {
        const uri = `file://${item.path}`;
        const isImage = fileExtensions.includes(
          item.name.split(".")[item.name.split(".").length - 1]
        );
        return { uri, isImage };
      })
    );
    return folderItems;
  } catch (error) {
    console.log("Error reading directory : ", error);
  }
};

export default { get };
