import React from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import ImageButton from "./ImageButton";

export default function Categories({ categories, selectCategory }) {
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
              background={item.background}
              onPress={() => selectCategory(item.value)}
            />
          )}
          keyExtractor={(item) => item.title + item.color}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { width: "100%", height: 100, marginTop: 40 },
  categories: { flexDirection: "row" },
});
