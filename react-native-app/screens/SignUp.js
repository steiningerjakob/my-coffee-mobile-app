import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
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

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { refreshUserContext } = useContext(userContext);

  async function createUser() {
    const response = await fetch(`${apiBaseUrl}/users/register`, {
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

    refreshUserContext();

    return response;
  }

  return (
    <Screen>
      <Header
        label="Sign up"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
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
          <Spacer />
          <Paragraph>Username:</Paragraph>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Username"
            clearButtonMode="while-editing"
            type="name"
          />
          <Spacer />
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
      <Footer firstName={firstName} />
    </Screen>
  );
}
