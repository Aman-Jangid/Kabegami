import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Customize from "../screens/Customize";
import Home from "../screens/Home";
import Settings from "../screens/Settings";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        navigationBarHidden: true,
        headerShown: false,
      }}
    >
      <Stack.Screen options={{}} name="Home" component={Home} />
      <Stack.Screen name="Customize" component={Customize} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
