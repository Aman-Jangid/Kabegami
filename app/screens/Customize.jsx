import React, { useEffect, useState } from "react";
import { Animated, Keyboard, StyleSheet, View } from "react-native";
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

// if api key is not available and nsfw is selected then
// show visual error "API-KEY is required to access nsfw wallpapers"

const initialTags = ["hot", "anime", "cats", "cars", "nature"];

const options = [
  { label: "Wallhaven.cc", value: "wallhaven" },
  { label: "That's all for now...", value: "wallhaven" },
];

const purities = [
  { title: "sfw", color: color.color5, text: color.color8, value: "100" },
  {
    title: "sketchy",
    color: color.color11,
    text: color.color8,
    value: "010",
  },
  { title: "nsfw", color: color.color10, text: color.color8, value: "001" },
];

export default function Customize() {
  const [tags, setTags] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resolutions, setResolutions] = useState("");
  const [animateHelpButton, setAnimateHelpButton] = useState(false);
  const [selectedPurities, setSelectedPurities] = useState(["1", "0", "0"]);

  const toggleLink = () => {
    setShowLink(!showLink);
    setAnimateHelpButton(false);
  };

  const getApiKeyAsync = async () => {
    const data = await storage.getData(keys.API_KEY);
    setApiKey(data);
  };

  const getTagsAsync = async () => {
    const data = await storage.getData(keys.TAGS);
    if (data?.length > 0) {
      setTags(data.join(","));
    } else setTags("");
  };

  const getResolutionsAsync = async () => {
    const data = await storage.getData(keys.RESOLUTIONS);
    setResolutions(data);
  };

  const getPurityAsync = async () => {
    const data = await storage.getData(keys.PURITY);
    setSelectedPurities(data.split(""));
  };

  const getTagProps = async (tag) => {
    // fetch tag images
    try {
      const res = await fetch(
        `https://wallhaven.cc/api/v1/search?q=${tag}&categories=111&purity=111&sorting=random`
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

  const showHelp = () => {
    setAnimateHelpButton(true);
  };

  const setTagsAsync = async () => {
    // const tagsAsync = await storage.getData(keys.TAGS);
    const filteredTags = tags
      .split(",")
      .filter((tag) => tag)
      .join(",");

    setTags(filteredTags);

    await storage.setData(keys.TAGS, tags.split(","));

    getUserTags();
  };

  const setApiKeyAsync = async (value) => {
    await storage.setData(keys.API_KEY, apiKey.trim());
  };

  const setPurityAsync = async () => {
    await storage.setData(keys.PURITY, selectedPurities.join(""));
  };

  const setResolutionsAsync = async () => {
    ``;
    const filteredRes = resolutions
      .split(",")
      .filter((res) => res)
      .join("");

    await storage.setData(keys.RESOLUTIONS, resolutions);
  };

  const convertPuritiesToString = (purities) => {
    const purity = ["0", "0", "0"];
    if (purities.includes("s")) {
      purity[0] = "1";
      setSelectedPurities(purity);
    }
    if (purities.includes("sk")) {
      purity[1] = "1";
      setSelectedPurities(purity);
    }
    if (purities.includes("ns")) {
      purity[2] = "1";
      setSelectedPurities(purity);
    }
  };

  const handleSelections = (value) => {
    if (value.size > 0) {
      const str = [];
      value.forEach((num) => {
        if (num[0] === "1") {
          str.push("s");
        }
        if (num[1] === "1") {
          str.push("sk");
        }
        if (num[2] === "1") {
          str.push("ns");
        }
      });
      convertPuritiesToString(str);
    }
  };

  const handleAPIkeyInput = (value) => {
    setApiKey(value);
  };

  const handleTagsInput = (value) => {
    setTags(value);
  };

  const handleResolutionsInput = (value) => {
    setResolutions(value);
  };

  const handleConfirmation = () => {
    setSaving(true);
    setTagsAsync();
    setApiKeyAsync();
    setPurityAsync();
    setTimeout(() => {
      setSaving(false);
    }, 700);
    Keyboard.dismiss();
  };

  useEffect(() => {
    getTagsAsync();
    getApiKeyAsync();
    getPurityAsync();
    if (!apiKey) {
      selectedPurities[2] === "0";
    }
  }, []);

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
          iconColor={animateHelpButton ? color.color10 : color.color4}
          toggleLink={toggleLink}
          handleChange={handleAPIkeyInput}
          value={apiKey}
          animate={animateHelpButton}
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
          placeholder="Tags (separate using , comma )"
          placeholderColor={color.color5}
          value={tags}
          handleChange={handleTagsInput}
        />
        <Input
          lines={2}
          backgroundColor={color.color3}
          color={color.color7}
          placeholder="Resolutions eg.1080x1920 (separate using , comma )"
          placeholderColor={color.color5}
          value={resolutions}
          handleChange={handleResolutionsInput}
        />
        {/* <ButtonSelection
          KEY={keys.PURITY}
          options={purities}
          handleSelections={handleSelections}
          numberOfSelectable={purities.length}
          dependency={apiKey}
          showHelp={showHelp}
        /> */}
        <Button
          title="confirm"
          color={color.color10}
          textColor={color.white}
          width="80%"
          onPress={handleConfirmation}
          disabled={saving}
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
