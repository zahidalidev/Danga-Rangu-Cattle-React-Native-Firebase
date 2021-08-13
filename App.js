import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { LogBox } from "react-native";

// screens
import LoginScreen from "./app/screens/auth/Index"
import HomeScreen from "./app/screens/HomeScreen"
import SearchPostsScreen from './app/screens/SearchPostsScreen';
import CreateFarm from './app/screens/CreateFarm';
import AddCattle from './app/screens/AddCattle';
import CattleDetailsScreen from './app/screens/CattleDetailsScreen';
import AllFarms from './app/screens/AllFarms';

// admin screens
import AdminAllFarms from './app/screens/admin/AdminAllFarms';
import AdminAllUsers from './app/screens/admin/AdminAllUsers';

// components
import AppDrawer from './app/components/AppDrawer';
import Colors from './app/config/Colors';

LogBox.ignoreAllLogs()

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {

  const DrawerApp = () => <Drawer.Navigator initialRouteName="HomeScreen"
    drawerType={"front"}
    overlayColor="transparent"
    edgeWidth={100}
    drawerStyle={{ backgroundColor: Colors.white, width: "75%" }}
    drawerContent={(props) => <AppDrawer {...props} />}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="CreateFarm" component={CreateFarm} />
    <Stack.Screen name="SearchPostsScreen" component={SearchPostsScreen} />
    <Stack.Screen name="AddCattle" component={AddCattle} />
    <Stack.Screen name="CattleDetailsScreen" component={CattleDetailsScreen} />
    <Stack.Screen name="AllFarms" component={AllFarms} />
    <Stack.Screen name="AdminAllFarms" component={AdminAllFarms} />
    <Stack.Screen name="AdminAllUsers" component={AdminAllUsers} />
  </Drawer.Navigator>

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="LoginScreen" >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DrawerApp" component={DrawerApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}