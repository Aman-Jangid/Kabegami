import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text } from "react-native";
import ImageItem from "./ImageItem";
import Loading from "./Loading";
import WallpaperSet from "./WallpaperSet";
import color from "../theme/colors";

const ImageFlatList = ({
  data,
  handleScrollEnd,
  scrollToTop,
  loading,
  marginBottom,
  end,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const flatlistRef = useRef(null);

  const handleScrollToTop = () => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  useEffect(() => {}, [optionsVisible]);

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
          marginBottom={marginBottom}
          imageUrl={imageUrl}
          handleShowOptions={handleShowOptions}
        />
      )}
      <FlatList
        ref={flatlistRef}
        scrollToTop={scrollToTop}
        refreshing={true}
        onEndReached={handleScrollEnd}
        onEndReachedThreshold={0.4}
        numColumns={3}
        style={{
          alignSelf: "center",
        }}
        data={data}
        renderItem={({ item }) => (
          <ImageItem
            key={item.id}
            thumbnail={item.thumbs.original}
            id={item.id}
            url={item.path}
            active={item.path === imageUrl}
            showOptions={() => handleShowOptions(item.path)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          end ? (
            <Text
              style={{
                position: "absolute",
                padding: 10,
                fontSize: 18,
                alignSelf: "center",
                width: "66%",
                bottom: 60,
                color: "white",
                textAlignVertical: "top",
                fontWeight: "bold",
                height: 50,
                flex: 1,
              }}
            >
              ~ that's it ~
            </Text>
          ) : (
            loading && (
              <Loading
                source={require("../assets/animations/loadingBar.json")}
              />
            )
          )
        }
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
