import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import color from "../theme/colors";
import LoadCursor from "./LoadCursor";

export default function ImageItem({ thumbnail, id, url, showOptions, active }) {
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
      onPress={() =>
        navigate("ImageDisplay", {
          path: url,
          thumbs: { original: thumbnail },
          id,
        })
      }
      onLongPress={handleLongPress}
      delayLongPress={300}
      activeOpacity={0.6}
    >
      <>
        {isLongPressing && <LoadCursor />}
        <Image
          source={{ uri: thumbnail }}
          style={[
            styles.image,
            {
              borderWidth: active ? 2 : 0,
              borderColor: color.color9,
              borderRadius: active ? 7 : 5,
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
