import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';

export default function Profile() {
  const navigation = useNavigation();
  return (
    <Screen>
      <Container>
        <Headline>Profile</Headline>
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
        <Button
          label="logout"
          variant
          // onPress={}
        />
      </Container>
    </Screen>
  );
}
