import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";
import color from "../theme/colors";
import IconButton from "./IconButton";
import uuid from "react-native-uuid";
import Clipboard from "@react-native-clipboard/clipboard";
import Icon from "./Icon";

export default function ImageInfo({
  colors,
  category,
  purity,
  resolution,
  url,
  tags,
  handleSearching,
  fetchTags,
}) {
  const [showCopied, setShowCopied] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);

  useEffect(() => {
    console.log("url changed...Fetching new tags.");
    // resetLiked();
    fetchTags();
  }, [url]);

  const handleOpenUrl = () => {
    Linking.openURL(url);
  };

  const handleCopyUrl = () => {
    Clipboard.setString(url);
    setShowCopied(true);
    setTimeout(() => {}, 100);

    setTimeout(() => {
      setChangeIcon(true);
    }, 250);

    setTimeout(() => {
      setShowCopied(false);
    }, 700);
    setChangeIcon(false);
  };

  const copiedAlert = (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* after 300ms change to checkmark-done-circle */}
      <Icon
        name={!changeIcon ? "checkmark-circle" : "checkmark-done-circle"}
        color={color.color19}
        iconPack="II"
        size={30}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: color.color19,
          letterSpacing: 1.3,
        }}
      >
        Copied!
      </Text>
    </View>
  );

  function getRandomPastelColor() {
    const MAX_HUE = 300;
    const SATURATION_RANGE = [40, 51]; // Saturation values between 50 and 100 (out of 100)
    const BRIGHTNESS_RANGE = [80, 89]; // Brightness values between 75 and 90 (out of 100)

    const hue = Math.floor(Math.random() * MAX_HUE);
    const saturation = Math.floor(
      Math.random() * (SATURATION_RANGE[1] - SATURATION_RANGE[0] + 1) +
        SATURATION_RANGE[0]
    );
    const brightness = Math.floor(
      Math.random() * (BRIGHTNESS_RANGE[1] - BRIGHTNESS_RANGE[0] + 1) +
        BRIGHTNESS_RANGE[0]
    );

    // Convert HSB to RGB
    const h = hue / 60;
    const s = saturation / 100;
    const v = brightness / 100;

    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));

    let r, g, b;
    if (i === 0) {
      r = v;
      g = t;
      b = p;
    } else if (i === 1) {
      r = q;
      g = v;
      b = p;
    } else if (i === 2) {
      r = p;
      g = v;
      b = t;
    } else if (i === 3) {
      r = p;
      g = q;
      b = v;
    } else if (i === 4) {
      r = t;
      g = p;
      b = v;
    } else {
      r = v;
      g = p;
      b = q;
    }

    // Convert RGB to hexadecimal
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return (
    <>
      <View style={styles.quickSearch}></View>
      <View style={styles.container}>
        <View style={styles.properties}>
          <Text
            style={[
              styles.label,
              {
                backgroundColor: color.color19,
                color: color.lightGrey,
                textTransform: "uppercase",
              },
            ]}
          >
            {category}
          </Text>
          <Text
            style={[
              styles.label,
              {
                textTransform: "uppercase",
                backgroundColor:
                  purity === "sfw"
                    ? color.color5
                    : purity === "sketchy"
                    ? color.color11
                    : color.color10,
              },
            ]}
          >
            {purity}
          </Text>
          <Text
            style={[
              styles.label,
              { backgroundColor: color.color15, color: color.color18 },
            ]}
          >
            {resolution}
          </Text>
        </View>
        <View style={styles.linkContainer}>
          {!showCopied ? <Text style={styles.url}>{url}</Text> : copiedAlert}
          <View style={{ flexDirection: "row", gap: 5 }}>
            <IconButton
              name="external-link"
              iconPack="FI"
              onPress={handleOpenUrl}
              size={25}
              color={color.color8}
              style={styles.link_button}
            />
            <IconButton
              name="copy"
              onPress={handleCopyUrl}
              iconPack="FI"
              size={25}
              color={color.color8}
              style={styles.link_button}
            />
          </View>
        </View>
        <View style={styles.colors}>
          {colors.map((color) => (
            <View
              key={color}
              style={[styles.colorItem, { backgroundColor: color }]}
            ></View>
          ))}
        </View>
        <Text style={styles.label}>Tags:</Text>
        <View style={styles.tags}>
          <FlatList
            data={tags}
            horizontal
            keyExtractor={() => uuid.v4()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSearching(item)}
                onLongPress={() => Clipboard.setString(item)}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      backgroundColor: `${getRandomPastelColor()}`,
                      margin: 2,
                      alignSelf: "center",
                      color: color.black,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 250,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: color.color4,
    overflow: "scroll",
  },
  properties: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  colorItem: {
    height: 30,
    width: "19%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  colorHex: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 5,
  },
  colors: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    color: color.color8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  linkContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  url: {
    fontWeight: "bold",
    fontSize: 18,
    color: color.color19,
  },
  link_button: {
    backgroundColor: color.color19,
    borderRadius: 10,
    padding: 2,
  },
  tags: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    height: 50,
    textAlignVertical: "center",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
