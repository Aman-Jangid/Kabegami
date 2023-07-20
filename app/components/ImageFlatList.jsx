import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ImageItem from "./ImageItem";

import WallpaperSet from "./WallpaperSet";

export default function ImageFlatList({ data, handleScrollEnd, loading }) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleShowOptions = (url) => {
    setOptionsVisible(!optionsVisible);
    setImageUrl(url);
  };

  return (
    <>
      {optionsVisible && <WallpaperSet imageUrl={imageUrl} />}
      <FlatList
        onEndReached={handleScrollEnd}
        numColumns={3}
        style={{ alignSelf: "center" }}
        data={data}
        renderItem={({ item }) => (
          <ImageItem
            thumbnail={item.thumbs.original}
            url={item.path}
            showOptions={() => handleShowOptions(item.path)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
