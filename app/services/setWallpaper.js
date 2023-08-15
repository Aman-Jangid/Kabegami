import { NativeModules } from "react-native";

const { WallpaperModule } = NativeModules;

// const setWallpapersWithInterval = async () => {
// const uris = [
//   "https://th.wallhaven.cc/lg/x6/x6p3y3.jpg",
//   "https://th.wallhaven.cc/small/ex/ex9gwo.jpg",
//   "https://th.wallhaven.cc/small/m3/m3zjx1.jpg",
//   "https://th.wallhaven.cc/small/1p/1p398w.jpg",
// ];

// const intervalInSeconds = 60; // Set the interval in seconds (e.g., 60 seconds)

//   try {
//     WallpaperModule.setWallpapers(
//       uris,
//       intervalInSeconds,
//       "both",
//       (error, message) => {
//         if (error) {
//           console.error("Error setting wallpapers:", error);
//         } else {
//           console.log(message); // Success message
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Error setting wallpapers:", error);
//   }
// };

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
  await WallpaperModule.setWallpaper(uri, screen, (err, msg) => {
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
