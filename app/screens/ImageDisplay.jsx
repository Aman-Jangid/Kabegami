import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import WallpaperSet from "../components/WallpaperSet";
import { useNavigation, useRoute } from "@react-navigation/native";
import storage from "../services/storage";
import keys from "../keys";
import CollectionAccumulator from "../components/CollectionAccumulator";
import ScrollableImage from "../components/ScrollableImage";
import ImageInfo from "../components/ImageInfo";
import getWallpapers, { getWallpaperInfo } from "../api/getWallpapers";
import createURL from "../api/createURL";
import ImageFlatList from "../components/ImageFlatList";
import ThemeContext from "../theme/ThemeContext";

// transform this into an scrollable like Categories.jsx

export default function ImageDisplay({}) {
  const [liked, setLiked] = useState();
  const [tags, setTags] = useState([]);
  const [likedArray, setLikedArray] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [wallpapers, setWallpapers] = useState([]);
  const [collectionsVisible, setCollectionsVisible] = useState(false);

  const { color } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    gestureIndicator: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.15)",
      top: -10,
      paddingTop: 30,
      paddingHorizontal: 5,
      borderRadius: 10,
      alignSelf: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      flex: 1,
    },
    buttons: {
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      bottom: 20,
      gap: 5,
      alignSelf: "center",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    info: {
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      width: "100%",
      overflow: "hidden",
      zIndex: 2000,
      borderRadius: 15,
    },
    search: {
      position: "absolute",
      zIndex: 10000,
      alignSelf: "center",
      top: 80,
      width: "98%",
      height: 420,
      backgroundColor: color.color4,
      borderRadius: 10,
    },
  });

  const { goBack, isFocused } = useNavigation();
  const route = useRoute();

  // const handleClose = () => {
  //   console.log("closing");
  //   setCollectionsVisible(false);
  //   setOptionsVisible(false);
  // };

  const handleCloseViewer = () => {
    goBack();
  };

  // get liked images array from async storage (ASYNC)
  const getLikedImagesAsync = async () => {
    const likedImages = await storage.getData(keys.LIKED_IMAGES);

    if (!Array.isArray(likedImages)) {
      storage.setData(keys.LIKED_IMAGES, []);
      setLikedArray([]);
      return;
    }

    setLikedArray(likedImages);
    checkLiked(likedImages);
  };

  // set likedArray to LIKED_IMAGES key in async storage (ASYNC)
  const setLikedImagesAsync = async () => {
    await storage.setData(keys.LIKED_IMAGES, likedArray);
  };

  const checkLiked = (images) => {
    if (images.filter((item) => item.id === route.params.id).length > 0) {
      setLiked(true);
    }
  };

  useEffect(() => {
    const tempLikedArray = [...likedArray];

    if (liked) {
      if (
        tempLikedArray.filter((item) => item.id === route.params.id).length > 0
      ) {
        return;
      }
      tempLikedArray.push(route.params);
      setLikedArray(tempLikedArray);
    }
    if (!liked) {
      const filteredArray = tempLikedArray.filter(
        (item) => item.id !== route.params.id
      );

      setLikedArray(filteredArray);
    }
  }, [liked]);

  const handleSearching = (query) => {
    setSearching(true);
    initiateSearch(query);
  };

  const search = async (searchTerm) => {
    const url = await createURL.createURL({
      q: query || searchTerm,
      sorting: "random",
      top: true,
      categories: "111",
      page: 1,
    });

    const data = await getWallpapers(url);
    return data;
  };

  const initiateSearch = async (query) => {
    console.log("searching for ", query);
    const data = await search(query);
    setWallpapers(data);
  };

  //get array of liked images that exists in async storage
  useEffect(() => {
    getLikedImagesAsync();
  }, []);

  useEffect(() => {
    setLikedImagesAsync();
  }, [likedArray]);

  // get image tags
  const getTags = async () => {
    const info = await getWallpaperInfo(route.params.id);
    const tagsArr = info.tags.map((tag) => tag.name);
    setTags(tagsArr.sort((a, b) => a.length - b.length));
  };

  const buttonContainer = {
    textAlignVertical: "center",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 2,
  };

  return (
    <View style={styles.container}>
      {optionsVisible && (
        <WallpaperSet
          imageUrl={route.params.path}
          local={route.params.local}
          hideDownload
          optionsVisible={optionsVisible}
          handleShowOptions={() => setOptionsVisible(!optionsVisible)}
        />
      )}
      {collectionsVisible && !route.params.local && (
        <CollectionAccumulator
          color={color}
          hide={() => setCollectionsVisible(false)}
          imageUrl={route.params.path}
        />
      )}
      <ScrollableImage
        uri={route.params.path}
        onPress={() => setShowImageInfo(false)}
        width={route.params.local ? 1920 : route.params.info.width}
        height={route.params.local ? 1080 : route.params.info.height}
      />
      <View style={styles.gestureIndicator}>
        <IconButton
          name="chevron-thin-down"
          iconPack="EI"
          size={50}
          color={color.white}
          onPress={handleCloseViewer}
        />
      </View>
      {showImageInfo && !route.params.local && (
        <View style={styles.info}>
          <ImageInfo
            color={color}
            tags={tags}
            colors={route.params.info.colors}
            category={route.params.info.category}
            purity={route.params.info.purity}
            resolution={route.params.info.resolution}
            url={route.params.info.url}
            id={route.params.id}
            handleSearching={handleSearching}
            resetLiked={() => setLiked(false)}
            fetchTags={async () => await getTags()}
          />
        </View>
      )}
      <View style={styles.buttons}>
        {!route.params.local && (
          <IconButton
            name="collections"
            iconPack="MI"
            size={35}
            color={color.color19}
            style={buttonContainer}
            onPress={() => setCollectionsVisible(!collectionsVisible)}
          />
        )}
        {!route.params.local && (
          <IconButton
            name="info"
            iconPack="MI"
            size={35}
            color={color.color19}
            style={buttonContainer}
            onPress={() => setShowImageInfo(true)}
          />
        )}
        <Button
          title="set as wallpaper"
          color={color.color19}
          textColor={color.white}
          onPress={() => setOptionsVisible(!optionsVisible)}
        />
        {!route.params.local && (
          <IconButton
            name={liked ? "heart" : "hearto"}
            iconPack="ADI"
            size={33}
            style={buttonContainer}
            color={color.color19}
            onPress={() => setLiked(!liked)}
          />
        )}
      </View>
      {showImageInfo && searching && !route.params.local && (
        <View style={styles.search}>
          <ImageFlatList
            data={wallpapers}
            changeImage={() => setLiked(false)}
          />
          <IconButton
            name="times-circle"
            iconPack="FAI"
            size={35}
            color={color.color9}
            onPress={() => setSearching(false)}
            style={{
              position: "absolute",
              top: -22,
              right: 6,
              backgroundColor: color.color4,
              borderRadius: 25,
              paddingHorizontal: 3,
            }}
          />
        </View>
      )}
      <StatusBar style="light" />
    </View>
  );
}
