import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { userContext } from '../App';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';
import { logoutUser } from '../util/apiFunctions';

export default function Home() {
  const navigation = useNavigation();

  const { firstName, refreshUserContext } = useContext(userContext);
  console.log('refreshUserContext Home', refreshUserContext);

  function logoutButtonHandler() {
    console.log('i am the logout button handler in Home');
    logoutUser();
    refreshUserContext();
    navigation.navigate('Splash');
  }

  return (
    <Screen>
      <Header label="Home" firstName={firstName} />
      <Container>
        <Headline>Welcome back, {firstName}</Headline>
      </Container>
      <Container>
        <Button
          label="go to your profile"
          variant
          onPress={() => navigation.navigate('Profile')}
        />
      </Container>
      <Spacer />
      <Container>
        <Button label="logout" variant onPress={logoutButtonHandler} />
      </Container>
    </Screen>
  );
}
