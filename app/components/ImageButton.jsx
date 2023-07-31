import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import Icon from "./Icon";
import color from "../theme/colors";

export default function ImageButton({
  active,
  title = "",
  onPress,
  textColor,
  background,
  width = 120,
  height = 45,
  quantity,
  uri,
  collection,
  disabled,
}) {
  const buttonStyles = active
    ? [
        styles.container,
        styles.active,
        {
          minWidth: title.length > 10 ? title.length * 13 : width,
          height,
        },
      ]
    : [
        styles.container,
        {
          minWidth: title.length > 10 ? title.length * 13 : width,
          height,
        },
      ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      disabled={disabled}
    >
      <Text style={[styles.title, { color: !textColor && "#fff" }]}>
        {title}
      </Text>
      <Image
        source={uri ? { uri: uri } : background}
        style={styles.background}
      />
      {collection && (
        <View style={styles.quantity}>
          <Icon name="images" iconPack="II" size={20} color={color.color6} />
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexWrap: "nowrap",
  },
  active: {
    borderWidth: 2,
    borderColor: color.color9,
  },
  title: {
    color: "white",
    position: "absolute",
    fontSize: 20,
    textShadowColor: color.black,
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 15,
    fontWeight: "900",
    textTransform: "uppercase",
    zIndex: 1000,
  },

  quantity: {
    flexDirection: "row",
    gap: 5,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: color.colorPrimary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    // borderRadius: 5,
  },
  quantityText: {
    fontSize: 15,
    fontWeight: "bold",
    color: color.color9,
  },
  background: {
    width: "100%",
    height: "100%",
  },
});
