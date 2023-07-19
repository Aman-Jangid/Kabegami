import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../components/Icon";

// Stack Navigators
import FavoritesStack from "./FavoritesStack";
import HomeStack from "./HomeStack";
import ExploreStack from "./ExploreStack";

const Tab = createBottomTabNavigator();

const Navigation = () => (
  <Tab.Navigator
    initialRouteName="HomeStack"
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        width: 200,
        height: 40,
        marginBottom: 10,
        left: "50%",
        transform: [{ translateX: -100 }],
        backgroundColor: "darksalmon",
        shadowColor: "transparent",
        borderRadius: 50,
        position: "absolute",
      },
    }}
  >
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: () => <Icon name="heart" iconPack="FAI" size={25} />,
      }}
      name="Favorites"
      component={FavoritesStack}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: () => <Icon name="home" iconPack="FAI" size={25} />,
      }}
      name="HomeStack"
      component={HomeStack}
    />
    <Tab.Screen
      options={{
        headerShown: false,
        tabBarIcon: () => <Icon name="wpexplorer" iconPack="FAI" size={25} />,
      }}
      name="Explore"
      component={ExploreStack}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    backgroundColor: "#4CAF50",
    borderRadius: 25,
  },
});

export default Navigation;
