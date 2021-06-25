import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';

export default function Home() {
  const navigation = useNavigation();

  // ping the logout API - cookie gets sent automatically
  async function logoutUser() {
    const { manifest } = Constants;

    // TODO: adjust to api.example.com to Heroku url for deployment
    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `api.example.com`;

    const apiBaseUrl = `http:${apiBaseUrlDraft}`;

    await fetch(`${apiBaseUrl}/logout`);
  }

  return (
    <Screen>
      <Container>
        <Headline>Home</Headline>
      </Container>
      <Container>
        <Button
          label="back to welcome screen"
          variant
          onPress={() => navigation.navigate('Welcome')}
        />
      </Container>
      <Spacer />
      <Container>
        <Button label="logout" variant onPress={logoutUser} />
      </Container>
    </Screen>
  );
}
