import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import LoadCursor from "./LoadCursor";
import IconButton from "./IconButton";
import ThemeContext from "../theme/ThemeContext";
import FastImage from "react-native-fast-image";

export default function ImageItem({
  thumbnail,
  id,
  url,
  info,
  showOptions,
  select,
  selected,
  onPressHandle,
  local = false,
  changeImage,
}) {
  const { navigate } = useNavigation();
  const [isLongPressing, setIsLongPressing] = useState(false);

  const { color } = useContext(ThemeContext);

  const handleLongPress = () => {
    setTimeout(() => {
      showOptions();
      setIsLongPressing(false);
    }, 200);
  };

  const [source, setSource] = useState(
    "https://i.ibb.co/cFD0XvV/endless-constellation-1.png"
  );

  return (
    <TouchableOpacity
      onPressIn={() => setIsLongPressing(true)}
      onPressOut={() => setIsLongPressing(false)}
      onPress={() => {
        if (select) {
          onPressHandle(id);
        } else {
          if (local) {
            navigate("ImageDisplay", {
              path: url,
              local: true,
              thumbs: { large: url },
              id: url.split("-")[url.split("-").length - 1].replace(".jpg", ""),
            });
          } else {
            changeImage ? changeImage() : null;
            navigate("ImageDisplay", {
              path: url,
              info: info,
              thumbs: { large: thumbnail },
              id: id,
            });
          }
        }
      }}
      onLongPress={handleLongPress}
      delayLongPress={300}
      activeOpacity={0.6}
    >
      {select && (
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 10000,
          }}
        >
          <IconButton
            name={selected ? "checkbox-blank" : "checkbox-blank-outline"}
            iconPack="MCI"
            size={20}
            color={color.color9}
            onPress={() => onPressHandle(id)}
            style={{
              borderWidth: 1,
              borderColor: color.color9,
              borderRadius: 5,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          />
        </View>
      )}
      <>
        {isLongPressing && <LoadCursor />}
        <FastImage
          onLoad={() => setSource(thumbnail)}
          source={{
            uri: source,
          }}
          style={[styles.image]}
        />
      </>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    minHeight: 200,
    width: 120,
    margin: 5,
    borderRadius: 10,
  },
});
