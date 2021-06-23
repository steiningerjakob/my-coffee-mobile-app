import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import Input from '../components/Input';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';

export default function SignUp() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen>
      <Header label="Sign up" />
      <ScrollView style={{ flex: 1 }}>
        <Container fill>
          <Spacer />
          <Input
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder={'First name'}
            clearButtonMode={'while-editing'}
            type={'name'}
          />
          <Spacer />
          <Input
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholder={'Last name'}
            clearButtonMode={'while-editing'}
            type={'name'}
          />
          <Spacer />
          <Spacer />
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={'Email'}
            clearButtonMode={'while-editing'}
            type={'emailAddress'}
          />
          <Spacer />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={'Password'}
            clearButtonMode={'while-editing'}
            type={'password'}
          />
        </Container>
        <Container>
          <Button label="go back" onPress={() => navigation.goBack()} />
        </Container>
      </ScrollView>
    </Screen>
  );
}
