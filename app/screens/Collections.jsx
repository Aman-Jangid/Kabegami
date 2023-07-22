import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ImageButton from "../components/ImageButton";
import Screen from "./Screen";
import color from "../theme/colors";
import BackButton from "../components/BackButton";

const collections = [
  {
    title: "T5",
    collectionImage: require("../assets/pictures/top.jpg"),
    numberOfImages: 16,
    id: 1,
  },
  {
    title: "Wlop",
    collectionImage: require("../assets/pictures/new.jpg"),
    numberOfImages: 51,
    id: 2,
  },
  {
    title: "OnePiece Fanarts",
    collectionImage: require("../assets/pictures/anime.jpg"),
    numberOfImages: 72,
    id: 3,
  },
  {
    title: "SlideShow",
    collectionImage: require("../assets/pictures/nature.jpg"),
    numberOfImages: 32,
    id: 4,
  },
  {
    title: "Kittens",
    collectionImage: require("../assets/pictures/cats.jpg"),
    numberOfImages: 131,
    id: 5,
  },
];

export default function Collections() {
  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Favorites" />
        <FlatList
          numColumns={2}
          data={collections}
          renderItem={({ item }) => (
            <ImageButton
              background={item.collectionImage}
              title={item.title}
              width={"48%"}
              height={100}
              quantity={item.numberOfImages}
              collection
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    width: "100%",
    flex: 1,
    height: "100%",
    backgroundColor: color.colorPrimary,
  },
});
