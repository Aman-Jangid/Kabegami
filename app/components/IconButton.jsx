import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Icons from "@expo/vector-icons";

export default function IconButton({
  name,
  size,
  color,
  onPress,
  iconPack,
  style,
}) {
  const IconPacks = {
    MI: Icons.MaterialIcons,
    MCI: Icons.MaterialCommunityIcons,
    ADI: Icons.AntDesign,
    FAI: Icons.FontAwesome,
    EI: Icons.Entypo,
    II: Icons.Ionicons,
  };

  if (!IconPacks[iconPack]) {
    console.log(`Icon-pack ${iconPack} is not supported!`);
    return null;
  }

  const styles = StyleSheet.create({
    buttonContainer: style,
  });

  const Icon = IconPacks[iconPack];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Icon
          name={name}
          size={size}
          color={color}
          style={styles.buttonContainer}
        />
      </View>
    </TouchableOpacity>
  );
}
