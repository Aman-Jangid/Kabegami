import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Icons from "@expo/vector-icons";

export default function IconButton({
  name,
  size,
  color,
  onPress,
  onPressIn,
  onPressOut,
  iconPack,
  style,
  disabled,
  disabledColor,
}) {
  const IconPacks = {
    MI: Icons.MaterialIcons,
    MCI: Icons.MaterialCommunityIcons,
    ADI: Icons.AntDesign,
    FAI: Icons.FontAwesome,
    EI: Icons.Entypo,
    II: Icons.Ionicons,
    FI: Icons.Feather,
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
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
    >
      <View style={styles.buttonContainer}>
        <Icon
          name={name}
          size={size}
          iconPack={iconPack}
          color={disabled ? disabledColor : color}
          style={styles.buttonContainer}
        />
      </View>
    </TouchableOpacity>
  );
}
