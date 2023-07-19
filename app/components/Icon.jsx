import React from "react";
import * as Icons from "@expo/vector-icons";

export default function Icon({ name, size, color, iconPack }) {
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

  const Icon = IconPacks[iconPack];

  return <Icon name={name} size={size} color={color} />;
}
