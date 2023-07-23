import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Screen from "./Screen";
import Loading from "../components/Loading";
import storage from "../services/storage";

export default function Home() {
  const { navigate } = useNavigation();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [query, setQuery] = useState(null);

  const getData = async () => {
    const searches = await storage.getData("RECENT_SEARCHES");
    setRecentSearches(searches);
  };

  const setData = async () => {
    await storage.setData("RECENT_SEARCHES", recentSearches);
  };

  const deleteData = async () => {
    await storage.deleteData("RECENT_SEARCHES");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [recentSearches]);

  const initiateSearch = async (term) => {
    setSearching(true);
    setWallpapers([]);

    if (!query) setQuery(term);

    if (!recentSearches.includes(term)) {
      setRecentSearches((prevSearches) => {
        const newSearchArray = [...prevSearches];
        newSearchArray.push(term);
        return newSearchArray;
      });
    }

    const url = createURL.createURL({
      q: term,
      sorting: "random",
      top: true,
      purity: "100",
      categories: "111",
      page: currentPage,
    });

    try {
      const response = await getWallpapers(url);
      setWallpapers(response);
      console.log("Fetched data successfully.");
      setSearching(false);
    } catch (error) {
      console.log("Failed to fetch data", error);
      setSearching(false);
    }
  };

  const loadMore = async (term) => {
    setLoading(true);
    if (!query) setQuery(term);

    const url = createURL.createURL({
      q: term,
      sorting: "random",
      top: true,
      purity: "100",
      categories: "111",
      page: currentPage,
    });

    try {
      const response = await getWallpapers(url);
      setEnd(response.length === 0);
      setWallpapers([...wallpapers, ...response]);
      console.log("Fetched data successfully.");
      setLoading(false);
    } catch (error) {
      console.log("Failed to fetch data", error);
      setLoading(false);
    }
  };

  const handleScrollEnd = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    loadMore(query);
  };

  // const removeSearchListItem = () => {};

  const emptySearchList = () => {
    setRecentSearches([]);
    deleteData();
  };

  const handleGoBack = () => {
    setWallpapers([]);
    setQuery(null);
    setLoading(false);
    setSearching(false);
  };

  const handleSearch = (term) => {
    setCurrentPage(1);
    setSearching(true);
    initiateSearch(term);
  };

  return (
    <Screen>
      <GestureHandlerRootView>
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <IconButton
              name={!query ? "circle-thin" : "chevron-with-circle-left"}
              iconPack={!query ? "FAI" : "EI"}
              size={!query ? 32 : 28}
              color={!query ? color.color3 : color.color9}
              onPress={() => handleGoBack()}
            />
            <Search textChangeHandle={handleSearch} />
          </View>
          {searching && (
            <Loading source={require("../assets/animations/searching.json")} />
          )}
          {query && (
            <View style={styles.listContainer}>
              <ImageFlatList
                end={end}
                scrollToTop={searching}
                marginBottom={90}
                data={wallpapers}
                loading={loading}
                handleScrollEnd={handleScrollEnd}
              />
            </View>
          )}
          {!query && (
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
                ListHeaderComponent={
                  <SearchListHeader onPress={emptySearchList} />
                }
                ListHeaderComponentStyle={{
                  justifyContent: "flex-start",
                  width: "100%",
                  padding: 5,
                  paddingHorizontal: 10,
                }}
              />
              <Button
                title="settings"
                onPress={() => navigate("Settings")}
                color={color.color4}
                textColor={color.color8}
                width="80%"
              />
              <Button
                title="configure api"
                onPress={() => navigate("Customize")}
                color={color.color4}
                textColor={color.color8}
                width="80%"
              />
            </>
          )}
        </View>
      </GestureHandlerRootView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: color.colorPrimary,
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
    maxHeight: 250,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: color.colorPrimary,
    marginBottom: 30,
  },
  listContainer: {
    width: "100%",
    marginBottom: -20,
    height: "94%",
  },
});
