import React from "react";
import { StyleSheet, View } from "react-native";
import Loading from "./Loading";

export default function SavingChanges() {
  return (
    <View style={styles.container}>
      <Loading source={require("../assets/animations/saving.json")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 10001,
    width: "90%",
    position: "absolute",
    alignSelf: "center",
    top: "40%",
    height: 200,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
