import { NativeModules } from "react-native";

const { WallpaperModule } = NativeModules;

export default function setWallpaper(url) {
  WallpaperModule.setWallpaperFromUrl(url, (err, msg) => {
    if (err) {
      console.log("Error setting wallpaper: ", err);
    } else {
      console.log("Success : ", msg);
    }
  });
}
