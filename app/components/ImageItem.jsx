import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableWi,
  TouchableWithoutFeedback,
} from "react-native";
import color from "../theme/colors";

export default function ImageItem({ thumbnail, url, showOptions, active }) {
  // implement long press to open a modal (WallpaperSet.jsx)

  const { navigate, setParams } = useNavigation();

  const handleLongPress = () => {
    showOptions(url);
  };
  const handlePress = () => {
    navigate("ImageDisplay", { url });
  };

  return (
    <>
      <TouchableWithoutFeedback
        onLongPress={handleLongPress}
        onPress={handlePress}
      >
        <Image
          source={{ uri: thumbnail }}
          style={[
            styles.image,
            {
              borderWidth: active ? 3 : 0,
              borderColor: color.color9,
              borderRadius: active ? 2 : 5,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    minHeight: 200,
    width: 120,
    margin: 5,
  },
});
