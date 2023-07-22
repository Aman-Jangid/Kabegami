import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import color from "../theme/colors";

const purities = [
  { title: "anime", color: color.color5 },
  { title: "general", color: color.color11 },
  { title: "people", color: color.color10 },
];

export default function ButtonSelection({ handleSelections, selections }) {
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
      {purities.map((purity, i) => (
        <Button
          title={purity.title}
          color={purity.color}
          textColor={
            selectedPurities.includes(purity.title) ? color.white : color.color7
          }
          key={purity + i}
          onPress={() => handleSelection(purity.title, i)}
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
