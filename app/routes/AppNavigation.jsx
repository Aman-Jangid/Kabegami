import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ImageDisplay from "../screens/ImageDisplay";
import Navigation from "./Navigation";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
      }}
      initialRouteName="App"
    >
      <Stack.Screen
        options={{
          navigationBarHidden: true,
        }}
        name="ImageDisplay"
        component={ImageDisplay}
      />
      <Stack.Screen
        options={{
          navigationBarHidden: true,
        }}
        name="App"
        component={Navigation}
      />
    </Stack.Navigator>
  );
}
