import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

export default function FullScreenImage({ source }) {
  const [width, setWidth] = useState();

  const getImageWidth = () => {
    Image.getSize(
      source.uri,
      (width, height) => {
        setWidth(width);
        console.log(width);
      },
      (err) => console.log(err)
    );
  };
  return (
    <ScrollView
      contentContainerStyle={{
        width: width,
        height: "100%",
        justifyContent: "center",
      }}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      <Image source={source} style={styles.image} onLoad={getImageWidth} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  image: {
    // flex: 1,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});
