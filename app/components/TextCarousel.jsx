import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";

const min = 0;

export default function TextCarousel({ items, color }) {
  const [itemIndex, setItemIndex] = useState(0);
  const styles = StyleSheet.create({
    dropdown: {
      width: "100%",
      alignSelf: "center",
      zIndex: 10,
      marginBottom: 8,
      backgroundColor: color.color3,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 10,
    },
    dropdownText: {
      fontSize: 20,
      fontWeight: "bold",
      letterSpacing: 1,
      color: color.color8,
    },
  });

  const max = items.length - 1;
  return (
    <View style={styles.dropdown}>
      <IconButton
        name="caretleft"
        iconPack="ADI"
        size={25}
        color={color.color9}
        disabledColor={color.color2}
        disabled={itemIndex === min}
        onPress={() => setItemIndex(itemIndex - 1, 0)}
      />
      <Text style={styles.dropdownText}>{items[itemIndex].label}</Text>
      <IconButton
        name="caretright"
        iconPack="ADI"
        size={25}
        color={color.color9}
        disabledColor={color.color2}
        disabled={itemIndex === max}
        onPress={() => setItemIndex(itemIndex + 1)}
      />
    </View>
  );
}
