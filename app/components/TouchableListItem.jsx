import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";
import color from "../theme/colors";
import Clipboard from "@react-native-clipboard/clipboard";
import IconButton from "./IconButton";

export default function TouchableListItem({
  text,
  handlePress,
  icon = true,
  iconName,
  iconPack,
  subText,
  background,
  textColor,
  removeItem,
}) {
  return (
    <TouchableOpacity
      onLongPress={() => {
        Clipboard.setString(text);
      }}
      style={[
        styles.touchable,
        { backgroundColor: background || color.color2 },
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: textColor || color.color6 }]}>
        {text}
      </Text>
      {icon ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name={iconName}
            iconPack={iconPack}
            size={20}
            color={color.color6}
          />
          <IconButton
            name={"x"}
            iconPack={"FI"}
            size={22}
            color={color.color6}
            style={{ paddingLeft: 3 }}
            onPress={() => removeItem(text)}
          />
        </View>
      ) : (
        <View style={styles.subTextContainer}>
          <Text style={{ color: textColor || color.color10 }}>{subText}</Text>
          <Icon
            name="image"
            iconPack="II"
            color={textColor || color.color10}
            size={20}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  touchable: {
    width: 330,
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    letterSpacing: 1.3,
    alignSelf: "center",
    fontSize: 17,
  },
  subTextContainer: {
    paddingVertical: 4,
    alignSelf: "center",
    flexDirection: "row",
    gap: 2,
  },
});
