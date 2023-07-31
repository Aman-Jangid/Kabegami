import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ImageItem from "./ImageItem";
import uuid from "react-native-uuid";
import folderInfo from "../services/folderInfo";
import WallpaperSet from "./WallpaperSet";
import values from "../keys";
import storage from "../services/storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import BackButton from "./BackButton";

export default function LocalImageFlatList({ scrollToTop, dir }) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [wallpapers, setWallpapers] = useState([]);

  const getWallpapers = async () => {
    const info = await folderInfo.get(dir);
    console.log("INFO", info);
    setWallpapers(info);
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    getWallpapers();
  }, [isFocused]);

  const flatlistRef = useRef(null);

  const handleScrollToTop = () => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  useEffect(() => {
    handleScrollToTop();
  }, [scrollToTop]);

  const handleShowOptions = (url) => {
    setOptionsVisible(!optionsVisible);
    setImageUrl(url);
  };

  return (
    <>
      {optionsVisible && (
        <WallpaperSet marginBottom={marginBottom} imageUrl={imageUrl} />
      )}
      <FlatList
        ref={flatlistRef}
        scrollsToTop={scrollToTop}
        data={wallpapers}
        ListHeaderComponent={<BackButton goTo={"favorites"} />}
        numColumns={3}
        keyExtractor={() => uuid.v4()}
        renderItem={({ item }) => (
          <ImageItem
            key={uuid.v4()}
            thumbnail={item.uri}
            url={item.uri}
            showOptions={() => handleShowOptions(item.uri)}
          />
        )}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
});
