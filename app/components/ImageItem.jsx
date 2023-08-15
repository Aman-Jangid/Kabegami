import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import color from "../theme/colors";
import LoadCursor from "./LoadCursor";
import FastImage from "react-native-fast-image";
import ImageInfo from "./ImageInfo";

export default function ImageItem({
  thumbnail,
  id,
  url,
  info,
  showOptions,
  select,
  selected,
  onPressHandle,
}) {
  const { navigate } = useNavigation();
  const [isLongPressing, setIsLongPressing] = useState(false);

  const handleLongPress = () => {
    setTimeout(() => {
      showOptions();
      setIsLongPressing(false);
    }, 200);
  };

  return (
    <TouchableOpacity
      onPressIn={() => setIsLongPressing(true)}
      onPressOut={() => setIsLongPressing(false)}
      onPress={() => {
        if (select) {
          onPressHandle(id);
        } else
          navigate("ImageDisplay", {
            path: url,
            info: info,
            thumbs: { original: thumbnail },
            id: id,
          });
      }}
      onLongPress={handleLongPress}
      delayLongPress={300}
      activeOpacity={0.6}
    >
      <>
        {isLongPressing && <LoadCursor />}
        <FastImage
          source={{ uri: thumbnail }}
          style={[
            styles.image,
            {
              borderWidth: selected && select ? 3 : 0,
              borderColor: selected ? color.color9 : color.color2,
              borderRadius: selected ? 7 : 5,
              borderStyle: "dashed",
            },
          ]}
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
