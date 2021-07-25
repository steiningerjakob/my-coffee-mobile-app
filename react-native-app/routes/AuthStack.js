import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

// eslint-disable-next-line
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SignIn"
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
