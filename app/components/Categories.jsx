import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import ImageButton from "./ImageButton";
import color from "../theme/colors";
import storage from "../services/storage";
import keys from "../keys";
import { useIsFocused } from "@react-navigation/native";
import uuid from "react-native-uuid";

export default function Categories({ selectedCategory, selectCategory }) {
  const [tags, setTags] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const getTags = async () => {
      const data = await storage.getData(keys.CATEGORIES);
      setTags(data);
    };
    getTags();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={20}
          style={styles.categories}
          data={tags}
          renderItem={({ item }) => {
            if (item) {
              return (
                <ImageButton
                  imageHeight={50}
                  title={item.title}
                  active={selectedCategory === item.value}
                  uri={item.background}
                  onPress={() => selectCategory(item.value)}
                />
              );
            }
          }}
          keyExtractor={() => uuid.v4()}
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
