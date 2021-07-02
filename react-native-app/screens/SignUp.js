import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();
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

    // Navigate to the profile page when the user has been created
    navigation.navigate('Profile');
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
      <Footer />
    </Screen>
  );
}
