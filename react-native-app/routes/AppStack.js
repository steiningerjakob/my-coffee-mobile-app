import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Browse from '../screens/Browse';
import Detail from '../screens/Detail';
import Favourites from '../screens/Favourites';
import MapView from '../screens/Map';
import Preferences from '../screens/Preferences';
import Profile from '../screens/Profile';
import Scanner from '../screens/Scanner';
import Setup from '../screens/Setup';

// eslint-disable-next-line
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Browse" component={Browse} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Map" component={MapView} />
    </Stack.Navigator>
  );
}
