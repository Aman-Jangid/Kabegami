import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ImageItem from "./ImageItem";
import uuid from "react-native-uuid";
import folderInfo from "../services/folderInfo";
import WallpaperSet from "./WallpaperSet";

export default function LocalImageFlatList({ scrollToTop, data }) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const flatlistRef = useRef(null);

  // const handle = () =>{}

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
        <WallpaperSet
          marginBottom={80}
          hideDownload
          imageUrl={imageUrl}
          local
          handleShowOptions={handleShowOptions}
        />
      )}
      <FlatList
        ref={flatlistRef}
        scrollsToTop={scrollToTop}
        data={data}
        contentContainerStyle={{ alignItems: "center" }}
        numColumns={3}
        keyExtractor={() => uuid.v4()}
        renderItem={({ item }) => (
          <ImageItem
            key={uuid.v4()}
            local
            thumbnail={item.uri}
            url={item.uri}
            showOptions={() => handleShowOptions(item.uri)}
            onPressHandle={() => console.log(item.url)}
          />
        )}
      />
    </>
  );
}
