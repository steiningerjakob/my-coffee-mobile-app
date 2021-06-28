import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { logoutUser } from '../util/apiFunctions';

export default function Profile() {
  const navigation = useNavigation();

  function logoutButtonHandler() {
    logoutUser();
    navigation.navigate('Splash');
  }

  return (
    <Screen>
      <Header label="Profile" />
      <Container>
        <Button
          label="back to welcome screen"
          variant
          onPress={() => navigation.navigate('Splash')}
        />
      </Container>
      <Spacer />
      <Container>
        <Button label="logout" variant onPress={logoutButtonHandler} />
      </Container>
    </Screen>
  );
}
