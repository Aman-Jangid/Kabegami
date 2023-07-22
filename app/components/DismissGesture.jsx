import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";

export default function DismissGesture({ onDismiss, children }) {
  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationX > 150) {
      onDismiss();
    }
    if (event.nativeEvent.translationX < 150) {
      onDismiss();
    }
  };

  const onHandleStateChange = (event) => {
    if (
      event.nativeEvent.state === State.END &&
      event.nativeEvent.translationX <= 50
    ) {
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandleStateChange}
        style={styles.container}
      >
        <View style={{ width: "100%" }}>{children}</View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 500,
    height: 200,
    flex: 1,
    backgroundColor: "lightgray",
  },
});
