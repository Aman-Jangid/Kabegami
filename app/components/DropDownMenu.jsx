import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import color from "../theme/colors";
import IconButton from "./IconButton";

const min = 0;
const max = 1;

export default function DropDownMenu() {
  const [itemIndex, setItemIndex] = useState(0);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Wallhaven.cc", value: "wallhaven" },
    { label: "Unsplash.com", value: "unsplash" },
  ]);

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
const styles = StyleSheet.create({
  dropdown: {
    width: "90%",
    alignSelf: "center",
    zIndex: 10,
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
