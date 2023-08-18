import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ImageDisplay from "../screens/ImageDisplay";
import Navigation from "./Navigation";
import { useAsyncContext } from "../context/AsyncContext";
import DownloadIndicator from "../components/DownloadIndicator";
import { useEffect, useState } from "react";
import storage from "../services/storage";
import keys from "../keys";
import Welcome from "../screens/Welcome";
import Loading from "../components/Loading";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [firstRun, setFirstRun] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  const { downloading } = useAsyncContext();

  const checkFirstRun = async () => {
    const value = await storage.getData(keys.DIRECTORY_PATH);
    if (value) {
      setFirstRun(false);
    } else setFirstRun(true);
  };

  useEffect(() => {
    checkFirstRun();

    setTimeout(() => {
      console.log("first run -> ", firstRun);
      setShowLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <DownloadIndicator downloading={downloading} />
      {showLoading ? (
        <Loading source={require("../assets/animations/checking.json")} />
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            navigationBarHidden: true,
            contentStyle: { height: "100%", width: "100%" },
          }}
          initialRouteName={firstRun === false ? "App" : "Welcome"}
        >
          <Stack.Screen name="ImageDisplay" component={ImageDisplay} />
          <Stack.Screen name="App" component={Navigation} />
          <Stack.Screen name="Welcome" component={Welcome} />
        </Stack.Navigator>
      )}
    </>
  );
}
