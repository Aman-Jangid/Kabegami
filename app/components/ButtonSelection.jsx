import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import color from "../theme/colors";

export default function ButtonSelection({
  handleSelections,
  selections,
  options,
}) {
  const [selectedPurities, setSelectedPurities] = useState(
    selections ? [...selections] : []
  );

  const handleSelection = (newSelection) => {
    if (selectedPurities.includes(newSelection))
      setSelectedPurities((prevSelections) => {
        const index = selectedPurities.findIndex(
          (string) => string === newSelection
        );
        const newSelections = [...prevSelections];
        newSelections.splice(index, 1);
        return newSelections;
      });
    else
      setSelectedPurities((prevSelections) => [
        ...prevSelections,
        newSelection,
      ]);
    // handles the selected items in parent component
    handleSelections(selectedPurities);
  };

  return (
    <View style={styles.container}>
      {options.map((item, i) => (
        <Button
          title={item.title}
          color={item.color}
          textColor={
            selectedPurities.includes(item.title) ? color.white : item.text
          }
          key={item + i}
          onPress={() => handleSelection(item.title, i)}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 10,
    paddingBottom: 20,
  },
});
