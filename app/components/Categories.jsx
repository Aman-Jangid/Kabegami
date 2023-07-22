import React from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import ImageButton from "./ImageButton";
import color from "../theme/colors";

export default function Categories({
  categories,
  selectedCategory,
  selectCategory,
}) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={10}
          style={styles.categories}
          data={categories}
          renderItem={({ item }) => (
            <ImageButton
              title={item.title}
              active={selectedCategory === item.value}
              background={item.background}
              onPress={() => selectCategory(item.value)}
            />
          )}
          keyExtractor={(item) => item.title + item.color}
        />
      </ScrollView>
      <View style={styles.bottom}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignSelf: "center",
    paddingHorizontal: 5,
    height: 75,
  },
  bottom: {
    height: 3,
    width: "100%",
    backgroundColor: color.color3,
    borderRadius: 50,
    marginBottom: 10,
  },
  categories: { flexDirection: "row" },
});
