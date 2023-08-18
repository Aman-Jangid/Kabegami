import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Downloaded from "../screens/Downloaded";
import Local from "../screens/Local";
import color from "../theme/colors";
import MaterialTabItem from "../components/MaterialTabItem";

const Tab = createMaterialTopTabNavigator();

export default SavedTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 20,
          width: "100%",
          justifyContent: "center",
          shadowColor: "transparent",
          backgroundColor: color.colorPrimary,
        },
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          display: "none",
          backgroundColor: color.color9,
          marginHorizontal: 20,
        },
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
          borderBottomColor: color.color9,
          borderBottomWidth: 3,
        },
        tabBarActiveTintColor: color.color9,
        tabBarInactiveTintColor: color.color4,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialTabItem color={color} title="Downloaded" />
          ),
        }}
        name="Downloaded"
        component={Downloaded}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialTabItem color={color} title="Local" />
          ),
        }}
        name="Local"
        component={Local}
      />
    </Tab.Navigator>
  );
};
