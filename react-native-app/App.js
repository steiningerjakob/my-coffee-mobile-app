import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import Detail from './screens/Detail';
import Favourites from './screens/Favourites';
import Home from './screens/Home';
import List from './screens/List';
import Preferences from './screens/Preferences';
import Profile from './screens/Profile';
import Setup from './screens/Setup';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Fragment>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          // the initial route will have to be changed eventually
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Preferences" component={Preferences} />
          <Stack.Screen name="Setup" component={Setup} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
