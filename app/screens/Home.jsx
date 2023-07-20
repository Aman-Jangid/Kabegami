import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Search from "../components/Search";
import TouchableListItem from "../components/TouchableListItem";
import ItemSeparator from "../components/ItemSeparator";
import Button from "../components/Button";
import color from "../theme/colors";
import createURL from "../api/createURL";
import { useNavigation } from "@react-navigation/native";
import ImageFlatList from "../components/ImageFlatList";
import getWallpapers from "../api/getWallpapers";
import IconButton from "../components/IconButton";
import SearchListHeader from "../components/SearchListHeader";

export default function Home() {
  const { navigate } = useNavigation();
  const [wallpapers, setWallpapers] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  const initiateSearch = async (query) => {
    setRecentSearches((prevSearches) => {
      const newSeachArray = [...prevSearches];
      newSeachArray.push(query);

      return newSeachArray;
    });
    setFetching(true);
    const url = createURL.createURL({
      q: query,
      sorting: "random",
      top: true,
      purity: "100",
      categories: "111",
    });
    console.log(url);
    try {
      const response = await getWallpapers(url);
      setWallpapers(response);
      console.log("Fetched data successfully.");
      setFetching(false);
    } catch (error) {
      console.log("Failed to fetch data", error);
      setFetching(false);
    }
  };

  const removeSeachListItem = () => {};

  const emptySearchList = () => {
    setRecentSearches([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <IconButton
          name={!wallpapers ? "circle-thin" : "chevron-with-circle-left"}
          iconPack={!wallpapers ? "FAI" : "EI"}
          size={!wallpapers ? 32 : 28}
          onPress={() => setWallpapers(null)}
        />
        <Search textChangeHandle={initiateSearch} />
      </View>
      {wallpapers && (
        <View style={styles.listContainer}>
          <ImageFlatList data={wallpapers} />
        </View>
      )}
      {!wallpapers && (
        <>
          <FlatList
            style={styles.history}
            data={recentSearches}
            renderItem={({ item }) => (
              <TouchableListItem
                text={item}
                handlePress={() => initiateSearch(item)}
              />
            )}
            keyExtractor={({ item }) => item}
            contentContainerStyle={{ alignItems: "center" }}
            ItemSeparatorComponent={<ItemSeparator />}
            ListHeaderComponent={<SearchListHeader onPress={emptySearchList} />}
            ListHeaderComponentStyle={{
              justifyContent: "flex-start",
              width: "100%",
              padding: 5,
              paddingHorizontal: 10,
            }}
          />
          <Button
            title="Add Custom Tags"
            onPress={() => navigate("Customize")}
            color={color.lightGrey}
            width="80%"
          />
        </>
      )}
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
  searchBar: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  history: {
    width: "90%",
    maxHeight: 300,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  listContainer: {
    width: "100%",
    height: "100%",
  },
});
