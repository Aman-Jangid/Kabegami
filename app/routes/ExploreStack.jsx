import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Explore from "../screens/Explore";
import ImageDisplay from "../screens/ImageDisplay";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
      }}
    >
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen
        options={{
          navigationBarHidden: true,
        }}
        name="ImageDisplay"
        component={ImageDisplay}
      />
    </Stack.Navigator>
  );
}
