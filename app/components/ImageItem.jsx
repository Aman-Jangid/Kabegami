import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import color from "../theme/colors";
import LoadCursor from "./LoadCursor";
import FastImage from "react-native-fast-image";
import Icon from "./Icon";
import IconButton from "./IconButton";

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
              thumbs: { original: url },
              id: url.split("-")[url.split("-").length - 1].replace(".jpg", ""),
            });
          } else {
            changeImage ? changeImage() : null;
            navigate("ImageDisplay", {
              path: url,
              info: info,
              thumbs: { original: thumbnail },
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
            top: 7,
            left: 7,
            zIndex: 10000,
          }}
        >
          <IconButton
            name={
              selected
                ? "checkbox-blank-circle"
                : "checkbox-blank-circle-outline"
            }
            iconPack="MCI"
            size={20}
            color={color.colorPrimary}
            onPress={() => onPressHandle(id)}
            style={{
              borderWidth: 1,
              borderColor: color.colorPrimary,
              borderRadius: 100,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          />
        </View>
      )}
      <>
        {isLongPressing && <LoadCursor />}
        <Image
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
  },
});
