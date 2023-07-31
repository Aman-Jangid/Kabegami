import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import color from "../theme/colors";
import ButtonSelection from "../components/ButtonSelection";
import LinkButton from "../components/LinkButton";
import BackButton from "../components/BackButton";
import Screen from "./Screen";
import storage from "../services/storage";
import keys from "../keys";
import TextCarousel from "../components/TextCarousel";
import SavingChanges from "../components/SavingChanges";

const initialTags = ["hot", "anime", "cats", "cars", "nature"];

const options = [
  { label: "Wallhaven.cc", value: "wallhaven" },
  { label: "Unsplash.com", value: "unsplash" },
  { label: "Pexels.com", value: "pexels" },
];

export default function Customize() {
  const [tags, setTags] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [saving, setSaving] = useState(false);
  const toggleLink = () => {
    setShowLink(!showLink);
  };

  const getTagsAsync = async () => {
    const data = await storage.getData(keys.TAGS);
    setTags(data.join(","));
  };

  const getApiKey = async () => {
    // get api key
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
    await storage.setData(keys.CATEGORIES, newTags);
  };

  useEffect(() => {
    getTagsAsync();
  }, []);

  const setTagsAsync = async () => {
    await storage.setData(keys.TAGS, tags.split(","));
    getUserTags();
  };

  const setApiKeyAsync = async () => {};

  const handleAPIkeyInput = (value) => {
    setApiKey(value);
  };

  const handleTagsInput = (value) => {
    setTags(value);
  };

  const handleConfirmation = () => {
    setSaving(true);
    setTagsAsync();
    setTimeout(() => {
      setSaving(false);
    }, 1000);
    // handle all the states and async storage variables
    // store api key in secure storage
    // store Api domain,tags and purity in async storage
  };

  const purities = [
    { title: "anime", color: color.color5, text: color.color8 },
    { title: "general", color: color.color11, text: color.color8 },
    { title: "people", color: color.color10, text: color.color8 },
  ];

  return (
    <Screen>
      <View style={styles.container}>
        <BackButton goTo="Home" />
        <TextCarousel items={options} />
        <Input
          backgroundColor={color.color3}
          color={color.color7}
          placeholder="API KEY"
          placeholderColor={color.color5}
          displayHelp={true}
          iconColor={color.color4}
          toggleLink={toggleLink}
          handleChange={handleAPIkeyInput}
          value={apiKey}
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
        <ButtonSelection options={purities} />
        <Button
          title="confirm"
          color={color.color10}
          textColor={color.white}
          width="80%"
          onPress={handleConfirmation}
        />
      </View>
      {saving && <SavingChanges />}
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.colorPrimary,
    alignItems: "center",
    paddingHorizontal: 15,
    height: "100%",
    width: "100%",
  },
});
