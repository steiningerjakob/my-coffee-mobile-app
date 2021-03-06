import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
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

    const json = await response.json();

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
        noGoBack
        noSignIn
      />
      <ScrollView style={{ flex: 1 }}>
        <Container>
          <Spacer />
          <Spacer />
          <Paragraph>Username:</Paragraph>
          <Spacer />
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Username"
            clearButtonMode="while-editing"
            type="text"
          />
          <Spacer large />
          <Paragraph>Password:</Paragraph>
          <Spacer />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            clearButtonMode="while-editing"
            secureTextEntry={true}
          />
          <Spacer large />
          <Text style={signInStyles.error}>{error}</Text>
          <Spacer large />
          <Button
            label="sign in"
            onPress={verifyUser}
            disabled={!email || !password}
          />
          <Spacer />
          <Spacer />
          <TouchableOpacity onPress={signUpButtonHandler}>
            <Text style={signInStyles.signUp}>
              New to beanify? Sign up here
            </Text>
          </TouchableOpacity>
        </Container>
      </ScrollView>
      <Footer firstName={firstName} />
    </Screen>
  );
}
