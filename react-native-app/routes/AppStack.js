import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Detail from '../screens/Detail';
import Favourites from '../screens/Favourites';
import Home from '../screens/Home';
import List from '../screens/List';
import Preferences from '../screens/Preferences';
import Profile from '../screens/Profile';
import Setup from '../screens/Setup';
import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}
