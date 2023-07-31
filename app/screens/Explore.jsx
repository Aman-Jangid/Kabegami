import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import getWallpapers from "../api/getWallpapers";
import Categories from "../components/Categories";
import createURL from "../api/createURL";
import ImageFlatList from "../components/ImageFlatList";
import color from "../theme/colors";
import Screen from "./Screen";
import Loading from "../components/Loading";
// search -> order (ascending) ->
// category (100 -> general,010 -> anime ,001 -> people) ->
// purity (100/110/111 -- sfw,sketchy,nsfw) -> API key is needed for --1
// &page=1 (24 images)
// seed --> for random results
// sorting random --> sort fetched items randomly
// resolutions --> required resolutions
// ratios --> aspect ratio
// "search?sorting=views&resolutions=1080x1920,1440x2560&order=asc&categories=010&purity=100&page=2"
// new uploads --> search?sorting&hot&categories=010&resolutions=1080x1920
// top wallpapers (from given time range) --> search?sorting&toplist&topRange=1M&categories=010&resolutions=1080x1920

export default function Explore() {
  const [wallpapers, setWallpapers] = useState();
  const [selectedCategory, setSelectedCategory] = useState("hot");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);

  const fetchWallpapers = async () => {
    setFetching(true);
    const url = createURL.createURL({
      q: selectedCategory !== "hot" ? selectedCategory : null,
      hot: selectedCategory === "hot",
      sorting: "random",
      categories: "110",
      purity: "100",
      page: currentPage,
    });
    const data = await getWallpapers(url);
    setFetching(false);
    setWallpapers(data);
  };

  // infinite scroll
  const fetchNewWallpapers = async () => {
    setLoading(true);
    const url = createURL.createURL({
      q: selectedCategory !== "hot" ? selectedCategory : null,
      hot: selectedCategory === "hot",
      sorting: "random",
      categories: "110",
      purity: "100",
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
