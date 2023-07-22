import React, { useState } from "react";
import { FlatList } from "react-native";
import ImageItem from "./ImageItem";
import Loading from "./Loading";
import WallpaperSet from "./WallpaperSet";
import color from "../theme/colors";

const ImageFlatList = ({ data, handleScrollEnd, loading, marginBottom }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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
        refreshing={true}
        onEndReached={handleScrollEnd}
        numColumns={3}
        style={{ alignSelf: "center" }}
        data={data}
        renderItem={({ item }) => (
          <ImageItem
            thumbnail={item.thumbs.original}
            url={item.path}
            active={imageUrl === item.path}
            showOptions={() => handleShowOptions(item.path)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={loading && Loading}
        ListFooterComponentStyle={{
          position: "absolute",
          backgroundColor: color.colorPrimary,
          paddingTop: 4,
          bottom: 0,
          width: "100%",
          height: 14,
          justifyContent: "flex-start",
        }}
      />
    </>
  );
};

export default React.memo(ImageFlatList);
