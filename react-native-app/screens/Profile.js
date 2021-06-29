import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { userContext } from '../App';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline, Paragraph } from '../components/Text';
import { logoutUser } from '../util/apiFunctions';

export default function Profile() {
  const navigation = useNavigation();

  const { firstName, lastName, email, refreshUserContext } =
    useContext(userContext);
  console.log('refreshUserContext Profile', refreshUserContext);

  function logoutButtonHandler() {
    console.log('i am the logout button handler in Profile');
    logoutUser();
    console.log('logoutUser Profile', logoutUser);
    refreshUserContext();
    navigation.navigate('Splash');
  }

  return (
    <Screen>
      <Header
        label="Profile"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Container>
        <Headline>Welcome back, {firstName}</Headline>
        <Headline>Profile details:</Headline>
        <Paragraph>First name: {firstName}</Paragraph>
        <Paragraph>Last name: {lastName}</Paragraph>
        <Paragraph>Email: {email}</Paragraph>
      </Container>
      <Container>
        <Button
          label="back to welcome screen"
          variant
          onPress={() => navigation.navigate('Splash')}
        />
      </Container>
      <Spacer />
      {firstName && (
        <Container>
          <Button label="logout" variant onPress={logoutButtonHandler} />
        </Container>
      )}
      <Footer />
    </Screen>
  );
}
