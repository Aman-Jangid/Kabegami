import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ImageDisplay from "../screens/ImageDisplay";
import Navigation from "./Navigation";
import { useAsyncContext } from "../context/AsyncContext";
import DownloadIndicator from "../components/DownloadIndicator";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { downloading } = useAsyncContext();

  return (
    <>
      <DownloadIndicator downloading={downloading} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarHidden: true,
          contentStyle: { height: "100%", width: "100%" },
        }}
        initialRouteName="App"
      >
        <Stack.Screen name="ImageDisplay" component={ImageDisplay} />
        <Stack.Screen name="App" component={Navigation} />
      </Stack.Navigator>
    </>
  );
}

// {!downloading && (
//   <Text
//     style={{
//       color: "white",
//       position: "absolute",
//       // top: "50%",
//       alignSelf: "center",
//     }}
//   >
//     AAAA
//   </Text>
// )}
