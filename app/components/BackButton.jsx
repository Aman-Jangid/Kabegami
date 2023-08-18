import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import IconButton from "./IconButton";
import ThemeContext from "../theme/ThemeContext";
export default function BackButton({ goTo }) {
  const { goBack } = useNavigation();

  const { color } = useContext(ThemeContext);

  const handleGoBack = () => {
    goBack();
  };

  const styles = StyleSheet.create({
    back: {
      flexShrink: 1,
      width: "100%",
      flexDirection: "row",
      paddingBottom: 20,
      paddingHorizontal: 15,
      alignItems: "center",
      gap: 10,
    },
    text: {
      fontSize: 18,
      color: color.color9,
    },
  });

  return (
    <View style={styles.back}>
      <IconButton
        name="chevron-with-circle-left"
        iconPack="EI"
        size={25}
        color={color.color9}
        onPress={handleGoBack}
      />
      <TouchableOpacity onPress={handleGoBack}>
        <Text style={styles.text}>{goTo}</Text>
      </TouchableOpacity>
    </View>
  );
}
