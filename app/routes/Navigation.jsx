import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Stack Navigators
import FavoritesStack from "./FavoritesStack";
import HomeStack from "./HomeStack";
import ExploreStack from "./ExploreStack";
import color from "../theme/colors";
import IconButton from "../components/IconButton";

const Tab = createBottomTabNavigator();

const activeButton = {
  backgroundColor: color.colorPrimary,
  borderRadius: 50,
  flex: 1,
  textAlignVertical: "center",
  paddingHorizontal: 8.9,
  alignItems: "center",
};

const Navigation = () => (
  <Tab.Navigator
    backBehavior="history"
    initialRouteName="HomeStack"
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        width: 190,
        height: 45,
        marginBottom: 15,
        left: "50%",
        transform: [{ translateX: -100 }],
        backgroundColor: color.color5,
        shadowColor: "transparent",
        borderWidth: 0,
        borderTopWidth: 0,
        borderTopColor: color.color7,
        backfaceVisibility: "hidden",
        borderColor: color.color7,
        borderRadius: 50,
        position: "absolute",
      },
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: color.color9,
      tabBarInactiveTintColor: color.colorPrimary,
    }}
  >
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused, size }) => (
          <IconButton
            disabled
            style={focused ? activeButton : null}
            name="heart"
            iconPack="FAI"
            size={28}
            disabledColor={color}
          />
        ),
      }}
      name="Favorites"
      component={FavoritesStack}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, focused, size }) => (
          <IconButton
            disabled
            style={focused ? activeButton : null}
            name="home"
            iconPack="FAI"
            size={30}
            disabledColor={color}
          />
        ),
      }}
      name="HomeStack"
      component={HomeStack}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: ({ color, focused, size }) => (
          <IconButton
            disabled
            style={focused ? activeButton : null}
            name="explore"
            iconPack="MI"
            size={32}
            disabledColor={color}
          />
        ),
      }}
      name="ExploreStack"
      component={ExploreStack}
    />
  </Tab.Navigator>
);

export default Navigation;
