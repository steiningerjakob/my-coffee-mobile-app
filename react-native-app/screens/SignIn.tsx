import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LoginResponse } from '../../common/types';
import { userContext } from '../App';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Input from '../components/Input';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Paragraph } from '../components/Text';
import { apiBaseUrl } from '../util/apiBaseUrl';

const signInStyles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 16,
  },
  signUp: {
    color: '#BC6C25',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { firstName, refreshUserContext } = useContext(userContext);

  async function verifyUser() {
    const response = await fetch(`${apiBaseUrl}/users/login`, {
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

    refreshUserContext();

    return response;
  }

  function signUpButtonHandler() {
    navigation.navigate('SignUp');
  }

  return (
    <Screen>
      <Header
        label="Sign in"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <ScrollView style={{ flex: 1 }}>
        <Container>
          <Spacer />
          <Spacer />
          <Paragraph>Email:</Paragraph>
          <Spacer />
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            clearButtonMode="while-editing"
            type="emailAddress"
          />
          <Spacer />
          <Spacer />
          <Spacer />
          <Paragraph>Password:</Paragraph>
          <Spacer />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
          />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Button label="sign in" onPress={verifyUser} />
          <Spacer />
          <Spacer />
          <TouchableOpacity onPress={signUpButtonHandler}>
            <Text style={signInStyles.signUp}>
              New to beanify? Sign up here
            </Text>
          </TouchableOpacity>
        </Container>
      </ScrollView>
      <Text style={signInStyles.error}>{error}</Text>
      <Footer />
    </Screen>
  );
}
