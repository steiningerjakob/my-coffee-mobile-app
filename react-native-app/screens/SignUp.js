import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import Input from '../components/Input';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Paragraph } from '../components/Text';

export default function SignUp() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function createUser() {
    const { manifest } = Constants;

    // TODO: adjust to api.example.com to Heroku url for deployment
    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `jakobs-mobile-coffee-app.herokuapp.com`;

    const apiBaseUrl =
      apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
        ? `https:${apiBaseUrlDraft}`
        : `http:${apiBaseUrlDraft}`;

    const response = await fetch(`${apiBaseUrl}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });
    // Navigate to the profile page when the user has been created
    navigation.navigate('Profile');
    return response;
  }

  return (
    <Screen>
      <Header label="Sign up" />
      <ScrollView style={{ flex: 1 }}>
        <Container fill>
          <Spacer />
          <Paragraph>First name:</Paragraph>
          <Input
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First name"
            clearButtonMode="while-editing"
            type="name"
          />
          <Spacer />
          <Paragraph>Last name:</Paragraph>
          <Input
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
            clearButtonMode="while-editing"
            type="name"
          />
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
        </Container>
      </ScrollView>
      <Container>
        <Button label="sign up" onPress={createUser} />
      </Container>
    </Screen>
  );
}
