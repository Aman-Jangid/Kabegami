import React, { useEffect, useRef, useState } from "react";
import color from "../theme/colors";
import { Animated, StyleSheet, TextInput, View } from "react-native";
import IconButton from "./IconButton";

export default function Input({
  lines,
  animate,
  backgroundColor,
  color,
  placeholder,
  placeholderColor,
  iconName = "help-circle-outline",
  iconColor,
  displayHelp,
  toggleLink,
  handleChange,
  value,
}) {
  const handleTextChange = (value) => {
    handleChange(value);
  };

  const scaleValue = useRef(new Animated.Value(1)).current;
  const colorValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(colorValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
      {
        iterations: -1, // Infinite loop
      }
    ).start();
  };

  const stopAnimation = () => {
    scaleValue.stopAnimation();
    colorValue.stopAnimation();
  };

  const interpolatedColor = colorValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: ["transparent", "transparent"],
  });

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    backgroundColor: interpolatedColor,
  };

  useEffect(() => {
    if (animate) {
      startAnimation();
    } else stopAnimation();
  }, [animate]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={(value) => handleTextChange(value)}
        style={[styles.input, { backgroundColor, color }]}
        multiline
        numberOfLines={lines}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
      />
      {displayHelp && (
        <Animated.View style={animatedStyle}>
          <IconButton
            color={iconColor}
            name={iconName}
            iconPack="II"
            size={40}
            onPress={toggleLink}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    alignSelf: "center",
    marginVertical: 8,
    fontSize: 18,
    borderRadius: 10,
    padding: 5,
    textAlignVertical: "top",
    paddingHorizontal: 10,
  },
});
