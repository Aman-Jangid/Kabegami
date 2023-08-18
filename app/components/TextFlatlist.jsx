import React from "react";
import { FlatList, StyleSheet } from "react-native";
import uuid from "react-native-uuid";

import TouchableListItem from "./TouchableListItem";
import ItemSeparator from "./ItemSeparator";

export default function TextFlatlist({
  data,
  icon,
  pack,
  handlePress,
  handleRemove,
  color,
}) {
  const styles = StyleSheet.create({
    container: {
      width: "90%",
      maxHeight: 250,
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 30,
    },
  });

  return (
    <FlatList
      data={data}
      style={styles.container}
      renderItem={({ item }) => (
        <TouchableListItem
          text={item}
          color={color}
          handlePress={() => handlePress(item)}
          icon={true}
          iconName={icon}
          iconPack={pack}
          removeItem={handleRemove}
        />
      )}
      keyExtractor={() => uuid.v4()}
      ItemSeparatorComponent={<ItemSeparator color={color.colorPrimary} />}
      ListHeaderComponentStyle={{
        width: "100%",
        height: 40,
        padding: 5,
        paddingHorizontal: 10,
      }}
    />
  );
}
