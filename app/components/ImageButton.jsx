import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import Icon from "./Icon";
import color from "../theme/colors";

export default function ImageButton({
  active,
  title,
  onPress,
  textColor,
  background,
  width = 120,
  height = 45,
  quantity,
  collection,
}) {
  const buttonStyles = active
    ? [styles.container, styles.active, { width, height }]
    : [styles.container, { width, height }];

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={[styles.title, { color: !textColor && "#fff" }]}>
        {title}
      </Text>
      <Image source={background} style={styles.background} />
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
    width: 120,
    height: 45,
    borderRadius: 10,
    margin: 5,

    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
