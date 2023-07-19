import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ImageItem({ thumbnail, url, showOptions }) {
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
      <TouchableOpacity onLongPress={handleLongPress} onPress={handlePress}>
        <Image source={{ uri: thumbnail }} style={styles.image} />
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    minHeight: 200,
    width: 120,
    margin: 5,
    borderRadius: 5,
  },
});
