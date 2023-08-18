import React from "react";
import { FlatList, StyleSheet } from "react-native";
import uuid from "react-native-uuid";

import TouchableListItem from "./TouchableListItem";
import FlatlistHeader from "./FlatlistHeader";
import ItemSeparator from "./ItemSeparator";

export default function TextFlatlist({
  data,
  icon,
  pack,
  title,
  handlePress,
  handleEmpty,
  handleRemove,
}) {
  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={({ item }) => (
        <TouchableListItem
          text={item}
          handlePress={() => handlePress(item)}
          icon={true}
          iconName={icon}
          iconPack={pack}
          removeItem={handleRemove}
        />
      )}
      keyExtractor={() => uuid.v4()}
      ItemSeparatorComponent={<ItemSeparator />}
      ListHeaderComponent={
        <FlatlistHeader title={title} onPress={handleEmpty} />
      }
      ListHeaderComponentStyle={{
        width: "100%",
        height: 40,
        padding: 5,
        paddingHorizontal: 10,
      }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    maxHeight: 250,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
  },
});
