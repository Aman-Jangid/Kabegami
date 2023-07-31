import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "./Icon";
import color from "../theme/colors";

export default function TouchableListItem({
  text,
  handlePress,
  icon = true,
  iconName,
  iconPack,
}) {
  return (
    <TouchableOpacity style={styles.touchable} onPress={handlePress}>
      <Text style={styles.text}>{text}</Text>
      {icon ? (
        <Icon
          name={iconName}
          iconPack={iconPack}
          size={20}
          color={color.color6}
        />
      ) : (
        <View style={styles.subTextContainer}>
          <Text style={styles.subText}>20</Text>
          <Icon name="image" iconPack="II" color={color.color10} size={20} />
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  touchable: {
    width: 330,
    flexDirection: "row",
    backgroundColor: color.color2,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    flex: 1,
    letterSpacing: 1.3,
    color: color.color6,
    alignSelf: "center",
    fontSize: 17,
  },
  subTextContainer: {
    paddingVertical: 4,
    alignSelf: "center",
    flexDirection: "row",
    gap: 2,
  },
  subText: {
    color: color.color10,
  },
});
