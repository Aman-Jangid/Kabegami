import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";
import FastImage from "react-native-fast-image";

export default function ImageButton({
  active,
  title = "",
  onPress,
  onLongPress,
  textColor,
  background,
  width = 120,
  height = 45,
  imageHeight,
  quantity,
  uri,
  collection,
  disabled,
  position = "center",
  color,
}) {
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
    },
    quantityText: {
      fontSize: 15,
      fontWeight: "bold",
      color: color.color9,
    },
  });

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
      onLongPress={onLongPress}
      style={buttonStyles}
      disabled={disabled}
    >
      <Text style={[styles.title, { color: !textColor && "#fff" }]}>
        {title}
      </Text>
      <View style={{ width: "100%", height: 150, justifyContent: position }}>
        <FastImage
          resizeMode="cover"
          source={uri ? { uri: uri } : background}
          style={{ height: imageHeight || 400 }}
        />
      </View>
      {collection && (
        <View style={styles.quantity}>
          <Icon name="images" iconPack="II" size={20} color={color.color6} />
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
