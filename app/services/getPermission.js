import { PermissionsAndroid, Platform } from "react-native";

const requestStoragePermission = async () => {
  try {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "YourApp needs access to your storage to create folders.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true; // For iOS, no need to request permission
    }
  } catch (err) {
    console.warn("Error requesting storage permission:", err);
    return false;
  }
};

export default { requestStoragePermission };
