import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { userContext } from '../App';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

// Source for conditional routing / authentication flow
// https://levelup.gitconnected.com/react-native-authentication-flow-the-simplest-and-most-efficient-way-3aa13e80af61

export default function Router() {
  const { firstName } = useContext(userContext);
  return (
    <NavigationContainer>
      {firstName ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
