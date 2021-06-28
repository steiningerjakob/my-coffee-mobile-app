import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { LoginResponse } from '../../common/types';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import Input from '../components/Input';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Paragraph } from '../components/Text';

const errorStyles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 16,
  },
});

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function verifyUser() {
    const { manifest } = Constants;

    // TODO: adjust to api.example.com to Heroku url for deployment
    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `api.example.com`;

    const apiBaseUrl = `http:${apiBaseUrlDraft}`;

    const response = await fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = (await response.json()) as LoginResponse;

    // Return error if verification goes wrong
    if ('errors' in json) {
      setError(json.errors[0].message);
      return;
    }

    // Navigate to the profile page when the user has successfully logged in
    navigation.navigate('Home');
    return response;
  }

  return (
    <Screen>
      <Header label="Sign in" />
      <ScrollView style={{ flex: 1 }}>
        <Container>
          <Spacer />
          <Paragraph>Email:</Paragraph>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            clearButtonMode="while-editing"
            type="emailAddress"
          />
          <Spacer />
          <Paragraph>Password:</Paragraph>
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
          />
          <Button label="sign in" onPress={verifyUser} />
        </Container>
      </ScrollView>
      <Text style={errorStyles.text}>{error}</Text>
    </Screen>
  );
}
