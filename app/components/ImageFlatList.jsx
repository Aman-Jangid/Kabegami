import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Text } from "react-native";
import ImageItem from "./ImageItem";
import Loading from "./Loading";
import WallpaperSet from "./WallpaperSet";
import ThemeContext from "../theme/ThemeContext";

const ImageFlatList = ({
  data,
  handleScrollEnd,
  scrollToTop,
  loading,
  marginBottom,
  select,
  selections,
  setSelections,
  end,
  changeImage,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  const { color } = useContext(ThemeContext);

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
        onEndReachedThreshold={0.8}
        numColumns={3}
        contentContainerStyle={{
          alignSelf: data?.length > 2 ? "center" : "flex-start",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
        data={data}
        renderItem={({ item }) => (
          <ImageItem
            key={item.id}
            thumbnail={item.thumbs.large}
            id={item.id}
            info={{
              category: item?.category || item.info.category,
              width: item?.dimension_x || item.info.width,
              height: item?.dimension_y || item.info.height,
              purity: item?.purity || item.info.purity,
              resolution: item?.resolution || item.info.resolution,
              colors: item?.colors || item.info.colors,
              url: item?.url || item.info.url,
            }}
            url={item.path}
            active={item.path === imageUrl}
            showOptions={() => handleShowOptions(item.path)}
            select={select}
            selected={select && selections.includes(item.id)}
            onPressHandle={setSelections}
            changeImage={changeImage}
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
