import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import IconButton from "./IconButton";
import storage from "../services/storage";
import keys from "../keys";

export default function TimeSetter({ color }) {
  const min = 5;
  const max = 90;

  const [time, setTime] = useState(30);

  const getTimeAsync = async () => {
    const value = await storage.getData(keys.TIME);

    if (!value) {
      setTime(30);
      return;
    }

    setTime(parseInt(value) / 1000);
  };

  const setTimeAsync = async () => {
    await storage.setData(keys.TIME, parseInt(time) * 1000);
  };

  useEffect(() => {
    getTimeAsync();
  }, []);

  useEffect(() => {
    setTimeAsync();

    if (time > max) {
      setTime(max);
    }
    if (time < min) {
      setTime(min);
    }
  }, [time]);

  const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: color.color5,
      position: "absolute",
      zIndex: 1010,
      paddingBottom: 10,
      paddingHorizontal: 10,
      alignItems: "center",
      alignSelf: "flex-end",
      top: "6%",
      borderRadius: 10,
      width: 200,
      minHeight: 50,
      backgroundColor: color.color2,
    },
    timerHeading: {
      fontSize: 18,
      color: color.color10,
      fontWeight: "bold",
      letterSpacing: 1.1,
    },
    timerContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 10,
    },
    inputStyle: {
      paddingVertical: 2,
      fontSize: 20,
      fontWeight: "bold",
      color: color.color18,
      paddingHorizontal: 20,
      backgroundColor: color.color3,
      marginHorizontal: 10,
      borderRadius: 5,
    },
  });

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.timerHeading}>Set Timer</Text>
        <View style={styles.timerContainer}>
          <IconButton
            name="minuscircleo"
            iconPack="ADI"
            size={30}
            color={color.color9}
            onPress={() => setTime((prevTime) => Math.max(prevTime - 1, min))}
            disabled={time === min}
            disabledColor={color.color11}
          />
          <TextInput
            keyboardType="number-pad"
            value={time.toString() + " min"}
            style={styles.inputStyle}
            onChangeText={(value) => setTime(Math.max(parseInt(value), min))}
          />
          <IconButton
            name="pluscircleo"
            iconPack="ADI"
            size={30}
            color={color.color9}
            onPress={() => setTime((prevTime) => Math.min(prevTime + 1, max))}
            disabled={time === max}
            disabledColor={color.color11}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
