import React from "react";
import { Linking, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Icon from "./Icon";

export default function LinkButton({ title, url, description, color }) {
  const openExternalUrl = () => {
    Linking.openURL(url).catch((error) => {
      console.log("Failed to open Url", error);
    });
  };

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: color.color15,
      borderRadius: 15,
      alignItems: "center",
      paddingHorizontal: 20,
      justifyContent: "space-between",
      flexDirection: "row",
      marginHorizontal: 10,
      marginVertical: 10,
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
      letterSpacing: 1.4,
      color: color.color18,
    },
    description: {
      fontSize: 13,
      width: "90%",
      padding: 5,
      letterSpacing: 1.1,
      color: color.color18,
    },
  });

  return (
    <>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.container} onPress={openExternalUrl}>
        <Text style={styles.text}>{title}</Text>
        <Icon
          name="external-link"
          iconPack="FAI"
          color={color.color18}
          size={25}
        />
      </TouchableOpacity>
    </>
  );
}
