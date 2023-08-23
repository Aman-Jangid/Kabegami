import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "../screens/Favorites";
import Collections from "../screens/Collections";
import CollectionContents from "../screens/CollectionContents";
import Saved from "../screens/Saved";

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
      <Stack.Screen name="CollectionContents" component={CollectionContents} />
      <Stack.Screen name="SavedTab" component={Saved} />
    </Stack.Navigator>
  );
}
