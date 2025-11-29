import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DepartmentsPage from "../DepartmentsPage";
import GroupPage from "../GroupsPage";
import IndexPage from "../IndexPage";
import HomePage from "../HomePage";
import StartPage from "../StartPage"
import BufferPage from "../BufferPage"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MenuPage from "../MenuPage";
import TeacherPage from "../TeacherPage";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function NavigateLog({ navigation }: { navigation: any }) {
  const [isStart, setStart] = useState(false)
  const AppStack = () => {
    return (
      <Stack.Navigator initialRouteName="MenuPage">
        <Stack.Screen
          name="MenuPage"
          component={MenuPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  const TabStack = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#46d5aa",
          },
        }}
      >
        <Tab.Screen
          name="Главная"
          component={HomePage}
          options={{
            //headerShown: Э,
            tabBarLabel: "Главная",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#ff6c36",
            tabBarInactiveTintColor: "gray",
          }}
        />
        <Tab.Screen
          name="Расписание"
          component={IndexPage}
          options={{
            tabBarLabel: "Расписание",

            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="table" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#ff6c36",
            tabBarInactiveTintColor: "gray",
          }}
        />
        <Tab.Screen
          name="Меню"
          component={AppStack}
          options={{
            tabBarLabel: "Меню",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="menu" color={color} size={size} />
            ),
            tabBarActiveTintColor: "#ff6c36",
            tabBarInactiveTintColor: "gray",
          }}
        />
      </Tab.Navigator>
    );
  };

  const AppDrawer = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerBackTitle: "Назад",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#46d5aa",
          },
        }}
      >
  
        <Stack.Screen
          name="StartPage"
          component={StartPage}
          options={{ headerShown: false }}
        />
        
      
        <Stack.Screen name={"Tab"} component={TabStack} />
       
        
        
        <Stack.Screen
          name="TeacherPage"
          component={TeacherPage}
          options={{ headerShown: true, headerTitle: "Поиск преподавателя" }}
        />
 
        <Stack.Screen
          name="DepartmentsPage"
          component={DepartmentsPage}
          options={{
            headerShown: true,
            headerTitle: "Выбор факультета",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="GroupPage"
          component={GroupPage}
          options={{ headerShown: true, headerTitle: "Поиск группы" }}
        />
        <Stack.Screen
          name="BufferPage"
          component={BufferPage}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}
