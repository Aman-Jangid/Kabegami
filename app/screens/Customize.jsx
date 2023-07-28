import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownMenu from "../components/DropDownMenu";
import Input from "../components/Input";
import Button from "../components/Button";
import color from "../theme/colors";
import ButtonSelection from "../components/ButtonSelection";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";
import Screen from "./Screen";
import storage from "../services/storage";
import values from "../values";

const initialTags = ["hot", "anime", "cats", "cars", "nature"];

export default function Customize() {
  const [tags, setTags] = useState("");
  const [showLink, setShowLink] = useState(false);
  const toggleLink = () => {
    setShowLink(!showLink);
  };

  const getTagsAsync = async () => {
    const data = await storage.getData(values.TAGS);
    setTags(data.join(","));
  };

  const getTagProps = async (tag) => {
    // fetch tag images
    try {
      const res = await fetch(
        `https://wallhaven.cc/api/v1/search?q=${tag}&categories=111&sorting=random`
      );
      const data = await res.json();
      return {
        title: tag,
        value: tag,
        background: await data.data[0].thumbs.small,
      };
    } catch (error) {
      console.log(`Couldn't find the image for tag ${tag} `, error);
    }
  };

  const getUserTags = async () => {
    const tagsArray = [...initialTags, ...tags.split(",")];

    const newTags = await Promise.all(
      tagsArray.map(async (tag) => await getTagProps(tag))
    );
    console.log(newTags);
    await storage.setData(values.CATEGORIES, newTags);
  };

  useEffect(() => {
    getTagsAsync();
  }, []);

  const setTagsAsync = async () => {
    await storage.setData(values.TAGS, tags.split(","));
    getUserTags();
  };

  const handleTagsInput = (value) => {
    setTags(value);
  };

  const handleConfirmation = () => {
    console.log("Confirmed");
    setTagsAsync();
    // handle all the states and async storage variables
    // store api key in secure storage
    // store Api domain,tags and purity in async storage
  };

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Home" />
        <DropDownMenu />
        <Input
          backgroundColor={color.color3}
          color={color.color7}
          placeholder="API KEY"
          placeholderColor={color.color5}
          displayHelp={true}
          iconColor={color.color4}
          toggleLink={toggleLink}
        />
        {showLink && (
          <LinkButton
            description="get an Api-key from the following provider to gain access to all features."
            title="open Wallhaven.cc"
            url={"https://www.wallhaven.cc/help/api"}
          />
        )}
        <Input
          lines={6}
          backgroundColor={color.color3}
          color={color.color7}
          placeholder="Tags (separate using , (comma) )"
          placeholderColor={color.color5}
          value={tags}
          handleChange={handleTagsInput}
        />
        <ButtonSelection />
        <Button
          title="confirm"
          color={color.color9}
          textColor={color.white}
          width="80%"
          onPress={handleConfirmation}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.colorPrimary,
    alignItems: "center",
    // paddingTop: 50,
    height: "100%",
    width: "100%",
  },
});
