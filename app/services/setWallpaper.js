import { NativeModules } from "react-native";

const { WallpaperModule } = NativeModules;

const setWallpaperSlideshow = async (uris, interval, screen) => {
  try {
    WallpaperModule.setWallpapers(uris, interval, screen, (error, message) => {
      if (error) {
        console.error("Error setting wallpapers:", error);
      } else {
        console.log(message); // Success message
      }
    });
  } catch (error) {
    console.error("Error setting wallpapers:", error);
  }
};

const setLocalWallpaper = async (uri, screen) => {
  await WallpaperModule.setWallpaper({ uri: uri }, screen, (err, msg) => {
    if (err) {
      console.log("Error setting wallpaper: ", err);
    } else {
      console.log("Success : ", msg);
    }
  });
};

export default async function setWallpaper(url, screen) {
  await WallpaperModule.setWallpaperFromUrl(url, screen, (err, msg) => {
    if (err) {
      console.log("Error setting wallpaper: ", err);
    } else {
      console.log("Success : ", msg);
    }
  });
}

export { setWallpaperSlideshow, setLocalWallpaper };
