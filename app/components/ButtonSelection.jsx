import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import storage from "../services/storage";

export default function ButtonSelection({
  dependency,
  handleSelections,
  options,
  showHelp,
  KEY,
  color,
}) {
  const [selectedPurities, setSelectedPurities] = useState(new Set(["100"]));

  const handleSelection = (newSelection) => {
    if (!dependency && newSelection[2] === "1") {
      // console.log(`can't select nsfw without an Api-Key`);
      showHelp();
      return;
    }

    if (selectedPurities.has(newSelection)) {
      const newSet = new Set(selectedPurities);
      newSet.delete(newSelection);
      setSelectedPurities(newSet);
      return;
    }

    const newSet = new Set(selectedPurities);
    newSet.add(newSelection);
    setSelectedPurities(newSet);
  };

  const getSelectionsAsync = async () => {
    const data = await storage.getData(KEY);
    if (data && data !== "000") {
      const selectionsSet = [];
      const selectionsStr = data;
      if (selectionsStr[0] === "1") {
        selectionsSet.push("100");
      }
      if (selectionsStr[1] === "1") {
        selectionsSet.push("010");
      }
      if (selectionsStr[2] === "1") {
        selectionsSet.push("001");
      }
      setSelectedPurities(new Set(selectionsSet));
    } else setSelectedPurities(new Set(["100"]));
  };

  useEffect(() => {
    getSelectionsAsync();
  }, []);

  useEffect(() => {
    if (selectedPurities.size === 0) {
      setSelectedPurities(new Set(["100"]));
    }

    handleSelections(selectedPurities);
  }, [selectedPurities]);

  return (
    <View style={styles.container}>
      {options.map((item, i) => (
        <Button
          title={item.title}
          color={item.color}
          textColor={
            selectedPurities.has(item.value) ? color.white : color.color7
          }
          key={item + i}
          onPress={() => handleSelection(item.value)}
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
