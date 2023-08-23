import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Screen from "./Screen";
import BackButton from "../components/BackButton";
import storage from "../services/storage";
import keys from "../keys";
import CollectionCreator from "../components/CollectionCreator";
import FolderFlatlist from "../components/FolderFlatlist";
import IconButton from "../components/IconButton";
import folderInfo from "../services/folderInfo";
import { useIsFocused } from "@react-navigation/native";
import TimeSetter from "../components/TimeSetter";
import ThemeContext from "../theme/ThemeContext";
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import notifee, { AndroidColor, EventType } from "@notifee/react-native";

import setWallpaper, {
  setLocalWallpaper,
  setWallpaperSlideshow,
} from "../services/setWallpaper";

export default function Collections({ navigation }) {
  const [collections, setCollections] = useState([
    { id: 0, title: "add_new_collection" },
  ]);

  const [showTimeSetter, setShowTimeSetter] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const [syncNow, setSyncNow] = useState(false);
  const [selected, setSelected] = useState("");
  const [time, setTime] = useState("");
  const [base64Arr, setBase64Arr] = useState([]);
  const [showSetSlideshow, setShowSetSlideshow] = useState(false);

  const { color } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      padding: 5,
      width: "100%",
      flex: 1,
      height: "100%",
      backgroundColor: color.colorPrimary,
    },
    header: {
      width: "100%",
      flexDirection: "row",
    },
  });

  const setTimerAsync = async () => {
    await storage.setData(keys.TIME, time);
  };

  const setCollectionNamesAsync = async () => {
    const collectionNames = collections
      .map((collection) => {
        if (collection.path) {
          return {
            title: collection.title,
            path: collection.path,
            quantity: collection.numberOfImages,
          };
        }
      })
      .filter((item) => item);

    await storage.setData(keys.COLLECTION_NAMES, collectionNames);
  };

  const getCollectionAsync = async () => {
    const data = await storage.getData(keys.COLLECTIONS);

    if (!data || data?.length === 0) {
      await storage.setData(keys.COLLECTIONS, [
        { id: 0, title: "add_new_collection" },
      ]);
      setCollections([{ id: 0, title: "add_new_collection" }]);
    } else {
      // setCollections(data);
      await getCollectionsContent(data);
    }
  };

  const getTimer = async () => {
    const value = await storage.getData(keys.TIME);
    setTime(value);
  };

  const openTimeSetter = () => {
    setShowTimeSetter(!showTimeSetter);
  };

  const setCollectionsAsync = async () => {
    await storage.setData(keys.COLLECTIONS, collections);
  };

  const handleAddCollection = (item) => {
    const newCollections = [...collections];

    if (!item) return;

    newCollections.push(item);
    setCollections([...newCollections]);
    setSyncNow(true);
  };

  const handleConfirm = async (item) => {
    setShowCreator(false);
    handleAddCollection(item);
  };

  const handleExit = () => {
    setShowCreator(false);
  };

  const handleEmpty = async () => {
    // add +collection to collections and storage
    await storage.setData(keys.COLLECTIONS, [
      { id: 0, title: "add_new_collection" },
    ]);
    setCollections([{ id: 0, title: "add_new_collection" }]);

    console.log("emptying");
  };

  const getCollectionsContent = async (data) => {
    const paths = data.map((item) => item.path);

    const dataFromPath = await Promise.all(
      paths.map(async (path) => await folderInfo.get(path))
    );

    const filteredData = dataFromPath.filter((data) => data);
    const numberOfItemsArray = filteredData.map((data) => data.length);

    numberOfItemsArray.unshift(0);

    const collectionsArr = [...data];
    collectionsArr.forEach(
      (collection, i) => (collection.numberOfImages = numberOfItemsArray[i])
    );
    // await storage.setData(keys.COLLECTIONS_PATH,paths)

    setCollections(collectionsArr);
  };

  const showNotification = async () => {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    notifee.displayNotification({
      title: "Foreground Service Notification",
      body: "Press the Quick Action to stop the service",
      android: {
        channelId,
        asForegroundService: true,
        style: { picture },
        actions: [
          // {
          //   title: "Stop",
          //   pressAction: {
          //     id: "stop",
          //   },
          // },
          // {
          //   title: "Prev",
          //   pressAction: {
          //     id: "prev",
          //   },
          // },
          {
            title: "Next",
            pressAction: {
              id: "next",
            },
          },
        ],
      },
    });

    notifee.registerForegroundService((notification) => {
      return new Promise(() => {
        notifee.onForegroundEvent(async ({ type, detail }) => {
          // if (detail.pressAction.id === "prev") {
          //   await setWallpaper(
          //     "https://th.wallhaven.cc/small/ex/ex9gwo.jpg",
          //     "home"
          //   );
          // }
          if (detail.pressAction.id === "next") {
            await setWallpaper(
              "https://th.wallhaven.cc/lg/jx/jxyopy.jpg",
              "home"
            );
          }
          // if (
          //   type === EventType.ACTION_PRESS &&
          //   detail.pressAction.id === "stop"
          // ) {
          //   await notifee.stopForegroundService();
          // }
        });
      });
    });
  };

  const getImageUriS = async () => {
    showNotification();

    // const path = RNFS.DownloadDirectoryPath;
    // const path = selected;

    // const paths = (await RNFS.readDir(path)).map((file) => file.path);

    // console.log(paths);

    // for (let i = 0; i < paths.length; i++) {
    //   const base64 = await RNFetchBlob.fs.readFile(paths[i], "base64");
    //   setBase64Arr((prevArr) => [...prevArr, base64]);
    // }

    // setWallpaperSlideshow([...base64Arr], 2000, "home");
  };

  useEffect(() => {}, [base64Arr]);

  const handlePress = async (item) => {
    // const index = collections.indexOf(item);
    const parentPath = await storage.getData(keys.COLLECTIONS_PATH);
    const path = parentPath + "/" + item.title;

    const folderItems = await folderInfo.get(path);
    // console.log(folderItems);
    navigation.navigate("CollectionContents", { items: folderItems });
  };

  useEffect(() => {
    if (selected) {
      setShowSetSlideshow(true);
    }
  }, [selected]);

  const handleLongPress = (path) => {
    if (path === selected) {
      setShowSetSlideshow(false);
      setSelected(null);
      return;
    }

    setSelected(path);
  };

  useEffect(() => {
    getCollectionAsync();
  }, []);

  useEffect(() => {
    if (syncNow) {
      setCollectionsAsync();
    }

    return () => {
      setSyncNow(false);
    };
  }, [syncNow]);

  useEffect(() => {
    setCollectionNamesAsync();
  }, [collections]);

  return (
    <Screen>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowTimeSetter(false);
          setShowCreator(false);
        }}
        style={{ zIndex: 1000 }}
      >
        <View style={styles.container}>
          {showCreator && (
            <CollectionCreator
              color={color}
              handleExit={handleExit}
              handleConfirm={handleConfirm}
            />
          )}
          {showTimeSetter && <TimeSetter color={color} />}
          <View style={styles.header}>
            <BackButton goTo="Favorites" />
            <IconButton
              name="slideshow"
              color={color.color9}
              iconPack="MI"
              size={28}
              style={{ marginHorizontal: 5 }}
              onPress={getImageUriS}
              disabled={!showSetSlideshow}
              disabledColor={color.color4}
            />
            <IconButton
              name="timer-outline"
              color={color.color9}
              iconPack="II"
              size={28}
              style={{ marginHorizontal: 5 }}
              onPress={openTimeSetter}
            />
            <IconButton
              name="delete"
              color={color.color9}
              iconPack="ADI"
              size={27}
              style={{ marginHorizontal: 5 }}
              onPress={handleEmpty}
            />
          </View>
          <FolderFlatlist
            color={color}
            data={collections}
            selected={selected}
            onItemPress={handlePress}
            onItemLongPress={handleLongPress}
            handleAdd={() => setShowCreator(true)}
          />
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
}
