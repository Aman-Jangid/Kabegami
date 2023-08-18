import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";

export default function TimeSetter({ color }) {
  // minute => minute * 1000ms when storing in async storage
  const min = 1;
  const max = 60;

  //  apply time when time setter closes *******************

  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time > max) {
      setTime(60);
    }
    if (time < min) {
      setTime(1);
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
      alignSelf: "center",
      top: "20%",
      borderRadius: 10,
      width: 180,
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
    <View style={styles.container}>
      <Text style={styles.timerHeading}>Set Timer</Text>
      <View style={styles.timerContainer}>
        <IconButton
          name="minuscircleo"
          iconPack="ADI"
          size={30}
          color={color.color9}
          onPress={() => setTime((prevTime) => prevTime - 1)}
          disabled={time === min}
          disabledColor={color.color11}
        />
        <TextInput
          keyboardType="number-pad"
          value={time.toString()}
          style={styles.inputStyle}
          onChangeText={(value) => setTime(value)}
        />
        <IconButton
          name="pluscircleo"
          iconPack="ADI"
          size={30}
          color={color.color9}
          onPress={() => setTime((prevTime) => prevTime + 1)}
          disabled={time === max}
          disabledColor={color.color11}
        />
      </View>
    </View>
  );
}
