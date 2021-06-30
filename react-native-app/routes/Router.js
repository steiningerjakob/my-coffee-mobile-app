import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { userContext } from '../App';
import Loading from '../components/Loading';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function Router() {
  const { firstName, isLoading } = useContext(userContext);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {firstName ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
