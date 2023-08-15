import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Screen from "./Screen";
import Categories from "../components/Categories";
import ImageFlatList from "../components/ImageFlatList";
import Loading from "../components/Loading";

import getWallpapers from "../api/getWallpapers";
import createURL from "../api/createURL";
import color from "../theme/colors";
import storage from "../services/storage";
import keys from "../keys";

export default function Explore() {
  const [wallpapers, setWallpapers] = useState();
  const [selectedCategory, setSelectedCategory] = useState("hot");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [purity, setPurity] = useState(null);

  const getApiConfiguration = async () => {
    const value = await storage.getData(keys.PURITY);
    setPurity(value);
  };

  const fetchWallpapers = async () => {
    setFetching(true);
    const url = await createURL.createURL({
      q: selectedCategory !== "hot" ? selectedCategory : null,
      hot: selectedCategory === "hot",
      sorting: "random",
      categories: "110",
      purity: purity,
      page: currentPage,
    });
    const data = await getWallpapers(url);
    setWallpapers(data);
    setFetching(false);
  };

  // infinite scroll
  const fetchNewWallpapers = async () => {
    setLoading(true);
    const url = await createURL.createURL({
      q: selectedCategory !== "hot" ? selectedCategory : null,
      hot: selectedCategory === "hot",
      sorting: "random",
      categories: "110",
      purity: purity,
      page: currentPage,
    });
    const data = await getWallpapers(url);
    setLoading(false);

    setWallpapers([...wallpapers, ...data]);
  };

  const selectCategory = (selection) => {
    setScrollToTop(true);
    setFetching(true);
    setLoading(false);
    setSelectedCategory(selection);
    setScrollToTop(false);
  };

  useEffect(() => {
    getApiConfiguration();
    fetchWallpapers();
  }, []);

  // fetch wallpapers whenever a category is selected
  useEffect(() => {
    fetchWallpapers();
  }, [selectedCategory]);

  const handleScrollEnd = async () => {
    setCurrentPage((prevPage) => {
      return prevPage + 1;
    });
    fetchNewWallpapers();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Categories
          selectedCategory={selectedCategory}
          selectCategory={selectCategory}
        />
        {fetching ? (
          <Loading source={require("../assets/animations/searching.json")} />
        ) : (
          <ImageFlatList
            scrollToTop={scrollToTop}
            loading={loading}
            data={wallpapers}
            handleScrollEnd={() => handleScrollEnd()}
          />
        )}
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.colorPrimary,
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
