import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ImageItem from "./ImageItem";

export default function ImageFlatList({ data }) {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleShowOptions = (id) => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <FlatList
      numColumns={3}
      style={{ alignSelf: "center" }}
      data={data}
      renderItem={({ item }) => (
        <ImageItem
          thumbnail={item.thumbs.original}
          url={item.path}
          showOptions={() => handleShowOptions(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
const styles = StyleSheet.create({
  container: {},
});
