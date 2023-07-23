import { NativeModules } from "react-native";

const { WallpaperModule } = NativeModules;

export default async function setWallpaper(url, where) {
  await WallpaperModule.setWallpaperFromUrl(url, where, (err, msg) => {
    if (err) {
      console.log("Error setting wallpaper: ", err);
    } else {
      console.log("Success : ", msg);
    }
  });
}
