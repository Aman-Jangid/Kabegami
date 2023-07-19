import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropDownMenu() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Wallhaven.cc", value: "wallhaven" },
    { label: "Unsplash.com", value: "unsplash" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.dropdown}
    />
  );
}
const styles = StyleSheet.create({
  dropdown: { width: "80%", alignSelf: "center", zIndex: 10 },
});
