import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Search from "../components/Search";
import TouchableListItem from "../components/TouchableListItem";
import ItemSeparator from "../components/ItemSeparator";
import Button from "../components/Button";
import color from "../theme/colors";
import downloadImage from "../services/downloadImage";
import Customize from "./Customize";
import { useNavigation } from "@react-navigation/native";

const recentSearches = [
  "Anime",
  "luffy",
  "one piece",
  "wlop",
  "naruto shippuden",
  "boa hancock",
];

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Search />
      <FlatList
        style={styles.history}
        data={recentSearches}
        renderItem={({ item }) => <TouchableListItem text={item} />}
        keyExtractor={({ item }) => item}
        contentContainerStyle={{ alignItems: "center" }}
        ItemSeparatorComponent={<ItemSeparator />}
      />
      <Button
        title="Add Custom Tags"
        onPress={() => navigate("Customize")}
        color={color.lightGrey}
        width="80%"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: "100%",
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  history: {
    padding: 10,
    width: "90%",
    maxHeight: 300,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
  },
});
