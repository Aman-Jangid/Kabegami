import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";
import color from "../theme/colors";
import createURL from "../api/createURL";
import { useNavigation } from "@react-navigation/native";
import ImageFlatList from "../components/ImageFlatList";
import getWallpapers from "../api/getWallpapers";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Screen from "./Screen";
import Loading from "../components/Loading";
import storage from "../services/storage";
import keys from "../keys";
import SearchBar from "../components/SearchBar";
import TextFlatlist from "../components/TextFlatlist";

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
    const searches = await storage.getData(keys.RECENT_SEARCHES);

    if (!searches) setRecentSearches([]);
    else setRecentSearches(searches);
    console.log(searches);
  };

  const setData = async () => {
    await storage.setData(keys.RECENT_SEARCHES, recentSearches);
  };

  const deleteData = async () => {
    await storage.setData(keys.RECENT_SEARCHES, []);
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

    if (recentSearches.includes(term)) {
      setRecentSearches((prevSearches) => {
        const newSearchArray = [...prevSearches];
        const index = newSearchArray.findIndex((value) => value === term);
        newSearchArray.splice(index, 1);
        newSearchArray.unshift(term);
        return newSearchArray;
      });
    }

    if (!recentSearches.includes(term)) {
      setRecentSearches((prevSearches) => {
        const newSearchArray = [...prevSearches];
        newSearchArray.unshift(term);
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
              <TextFlatlist
                data={recentSearches}
                handlePress={initiateSearch}
                handleEmpty={emptySearchList}
                icon="enter"
                pack="ADI"
                title={"Recent searches"}
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
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: color.colorPrimary,
    gap: 10,
  },
});
