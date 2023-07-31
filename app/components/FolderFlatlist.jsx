import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";
import ImageButton from "./ImageButton";
import Icon from "./Icon";
import color from "../theme/colors";

export default function FolderFlatlist({ data, handleAdd }) {
  return (
    <FlatList
      data={data}
      keyExtractor={() => uuid.v4()}
      numColumns={2}
      renderItem={({ item }) => {
        if (item.title !== "add_new_collection") {
          return (
            <ImageButton
              uri={item.collectionImage}
              title={item.title}
              width={"46%"}
              height={100}
              quantity={item.numberOfImages}
              collection
            />
          );
        } else
          return (
            <TouchableOpacity onPress={handleAdd} style={styles.addCollection}>
              <Icon name="plus" iconPack="EI" color={color.color6} size={80} />
            </TouchableOpacity>
          );
      }}
    />
  );
}
const styles = StyleSheet.create({
  addCollection: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    height: 100,
    backgroundColor: color.color4,
    alignItems: "center",
    justifyContent: "center",
  },
});