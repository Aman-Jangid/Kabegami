import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "../screens/Favorites";
import Collections from "../screens/Collections";
import SavedTab from "./SavedTab";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
      }}
    >
      <Stack.Screen name="Favorite" component={Favorites} />
      <Stack.Screen name="Collections" component={Collections} />
      <Stack.Screen name="SavedTab" component={SavedTab} />
    </Stack.Navigator>
  );
}
