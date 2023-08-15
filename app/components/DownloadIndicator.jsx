import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import color from "../theme/colors";
import Icon from "./Icon";

export default DownloadIndicator = ({ downloading }) => {
  if (!downloading) {
    return null;
  }

  const dotArr = [".", ".", "."];

  const [dots, setDots] = useState(".");

  if (downloading) {
    setInterval(() => {
      setDots((prevDots) => prevDots.concat("."));
    }, 1000);

    if (dots.length > 5) {
      setDots(".");
    }
  }

  return (
    // get progress from WallpaperSet component and style...

    <View style={styles.container}>
      <Icon
        // name={showDone ? "file-download-done" : "file-download"}
        name={"file-download"}
        iconPack="MI"
        size={22}
        color={color.color8}
      />
      <Text style={styles.text}>{dots}</Text>
      {/* <Text style={styles.text}>.</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    top: 120, // Adjust as needed
    right: 20, // Adjust as needed
    backgroundColor: color.color4,
    borderWidth: 3,
    borderColor: color.color10,
    padding: 6,
    borderRadius: 25,
    zIndex: 1000,
    alignItems: "center",
  },
  text: {
    color: color.color8,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
