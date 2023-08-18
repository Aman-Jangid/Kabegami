import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import color from "../theme/colors";
import createURL from "../api/createURL";
import getWallpapers from "../api/getWallpapers";
import storage from "../services/storage";
import keys from "../keys";

import Screen from "./Screen";
import Loading from "../components/Loading";
import ImageFlatList from "../components/ImageFlatList";
import SearchBar from "../components/SearchBar";
import TextFlatlist from "../components/TextFlatlist";
import IconButton from "../components/IconButton";
import FlatlistHeader from "../components/FlatlistHeader";

function Home() {
  const { navigate } = useNavigation();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [query, setQuery] = useState(null);
  // const [purity, setPurity] = useState(null);

  // get every time there's a change in recentSearches state variable
  const getRecentSearches = async () => {
    const value = await storage.getData(keys.RECENT_SEARCHES);
    setRecentSearches(value);
  };

  // set every time there's a change in recentSearches state variable
  const setRecentSearchesToStorage = async () => {
    await storage.setData(keys.RECENT_SEARCHES, recentSearches);
  };

  const handleRecentSearches = (query) => {
    if (recentSearches.includes(query)) {
      const searches = [...recentSearches];
      const index = searches.findIndex((search) => search === query);
      searches.splice(index, 1);
      searches.unshift(query);
      setRecentSearches(searches);
    } else {
      setRecentSearches((prevSearches) => [query, ...prevSearches]);
    }
  };

  const search = async (searchTerm) => {
    const url = await createURL.createURL({
      q: searchTerm || query,
      sorting: "random",
      top: true,
      categories: "111",
      page: currentPage,
    });

    const data = await getWallpapers(url);
    return data;
  };

  const initiateSearch = async (searchTerm) => {
    setSearching(true);

    handleRecentSearches(searchTerm);

    const data = await search(searchTerm);
    setWallpapers(data);

    setSearching(false);
  };

  const getMoreResults = async () => {
    setLoading(true);

    setCurrentPage((prevPage) => prevPage + 1);
    const newData = await search();
    // append new wallpapers
    setWallpapers([...wallpapers, ...newData]);

    setLoading(false);
  };

  const handleSearch = (value) => {
    setWallpapers([]);
    setQuery(value);
    initiateSearch(value);
  };

  const handleScrollEnd = () => {
    getMoreResults();
  };

  const handleGoBack = () => {
    setWallpapers([]);
    setLoading(false);
    setSearching(false);
    setCurrentPage(1);
    setEnd(false);
    setQuery("");
    navigate("HomeStack");
  };

  const handleEmptyList = () => {
    setRecentSearches([]);
  };

  const handleRemove = (item) => {
    const filteredSearches = recentSearches.filter((search) => search !== item);
    setRecentSearches(filteredSearches);
  };

  // on component mount
  useEffect(() => {
    getRecentSearches();
  }, []);

  // on search
  useEffect(() => {
    setRecentSearchesToStorage();
  }, [recentSearches]);

  return (
    <Screen>
      <GestureHandlerRootView>
        <View style={styles.container}>
          <SearchBar
            searching={query}
            handleSearch={handleSearch}
            handleBack={handleGoBack}
          />
          {searching && (
            <Loading source={require("../assets/animations/searching.json")} />
          )}
          {query && (
            <ImageFlatList
              end={end}
              scrollToTop={searching}
              marginBottom={90}
              data={wallpapers}
              loading={loading}
              handleScrollEnd={handleScrollEnd}
            />
          )}
          {!query && (
            <>
              <FlatlistHeader
                title={"Recent Searches"}
                onPress={handleEmptyList}
              />
              <TextFlatlist
                data={recentSearches}
                handlePress={handleSearch}
                handleRemove={handleRemove}
                icon="enter"
                pack="ADI"
                title={"Recent searches"}
              />
              <View style={styles.settings}>
                <IconButton
                  name={"settings-sharp"}
                  iconPack={"II"}
                  onPress={() => navigate("Settings")}
                  color={color.color9}
                  size={34}
                />
                <IconButton
                  size={32}
                  name={"api"}
                  iconPack={"MCI"}
                  onPress={() => navigate("Customize")}
                  color={color.colorPrimary}
                  style={{
                    paddingHorizontal: 0.1,
                    paddingVertical: 0.1,
                    borderRadius: 50,
                    textAlign: "center",
                    backgroundColor: color.color9,
                  }}
                />
              </View>
            </>
          )}
        </View>
      </GestureHandlerRootView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: color.colorPrimary,
    gap: 10,
  },
  settings: {
    position: "absolute",
    bottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
    right: 5,
  },
});

export default memo(Home);
