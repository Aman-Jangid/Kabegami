import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Explore from "../screens/Explore";

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
    </Stack.Navigator>
  );
}
