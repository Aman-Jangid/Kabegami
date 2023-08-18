import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import uuid from "react-native-uuid";
import TouchableListItem from "./TouchableListItem";
import storage from "../services/storage";
import keys from "../keys";
import downloadImage from "../services/downloadImage";
import ItemSeparator from "./ItemSeparator";

export default function CollectionAccumulator({ hide, imageUrl, color }) {
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState(null);

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
      backgroundColor: color.color19,
      alignItems: "center",
    },
    flatlist: {
      height: "100%",
      width: "100%",
      borderRadius: 10,
    },
    text: {
      fontSize: 18,
      alignSelf: "center",
      fontWeight: "bold",
      color: color.color8,
      paddingVertical: 5,
    },
    listContainer: {
      width: "100%",
      height: 205,
      backgroundColor: "rgba(0,0,0,0.1)",
      alignSelf: "flex-start",
      borderRadius: 5,
      overflow: "hidden",
    },
    buttons: {
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
      backgroundColor: color.color19,
    },
  });

  const handleSelection = (index) => {
    setSelected(index);
  };

  const handleConfirm = async () => {
    if (selected === null) return;

    const collection = collections[selected];
    collection.quantity += 1;

    setCollections(
      (prevCollections) => (prevCollections[selected] = collection)
    );

    await downloadImage(imageUrl, collections[selected].path);

    await storage.setData(keys.COLLECTION_NAMES, collections);
    hide();
  };

  const getData = async () => {
    const data = await storage.getData(keys.COLLECTION_NAMES);
    setCollections(Array.from(data));
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
          renderItem={({ item, index }) => (
            <TouchableListItem
              background={
                selected === index ? "rgba(0,0,0,0.2)" : "transparent"
              }
              textColor={selected === index ? color.color18 : color.color8}
              text={item.title}
              icon={false}
              subText={item.quantity}
              handlePress={() => handleSelection(index)}
            />
          )}
          ItemSeparatorComponent={<ItemSeparator color="transparent" />}
          keyExtractor={() => uuid.v4()}
        />
        <View style={styles.buttons}>
          <IconButton
            color={color.color8}
            name="cancel"
            iconPack="MI"
            size={50}
            onPress={hide}
          />
          <IconButton
            color={color.color8}
            name="check-circle"
            iconPack="MI"
            size={50}
            onPress={handleConfirm}
          />
        </View>
      </View>
    </View>
  );
}
