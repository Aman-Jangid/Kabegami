import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import color from "../theme/colors";
import IconButton from "./IconButton";
import uuid from "react-native-uuid";
import TouchableListItem from "./TouchableListItem";
import storage from "../services/storage";
import values from "../values";

const collections = [
  "neko",
  "marvel",
  "anime",
  "cars",
  "nature",
  "cosmos",
  "birds",
  "sea",
  "lord of the rings",
  "monochrome",
  "monogatari",
];

export default function CollectionAccumulator() {
  const getData = async () => {
    const data = await storage.getData(values.COLLECTION_NAMES);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add to Collection</Text>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatlist}
          data={collections}
          renderItem={({ item }) => (
            <TouchableListItem text={item} icon={false} />
          )}
          keyExtractor={(item) => uuid.v4()}
        />
        <View style={styles.buttons}>
          <IconButton
            color={color.color7}
            name="check-circle"
            iconPack="MI"
            size={50}
          />
          <IconButton
            color={color.color7}
            name="cancel"
            iconPack="MI"
            size={50}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 200,
    borderRadius: 15,
    alignSelf: "center",
    paddingHorizontal: 12,
    zIndex: 1001,
    width: 250,
    height: 250,
    backgroundColor: color.color6,
    alignItems: "center",
  },
  flatlist: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    alignSelf: "flex-start",
    fontWeight: "bold",
    color: color.color8,
    paddingVertical: 5,
  },
  listContainer: {
    width: "100%",
    height: 205,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignSelf: "flex-start",
    borderRadius: 5,
    overflow: "hidden",
  },
  buttons: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: color.color6,
  },
});
