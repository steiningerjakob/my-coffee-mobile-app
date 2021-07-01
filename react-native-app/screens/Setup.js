import React, { useContext } from 'react';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import { Headline } from '../components/Text';

export default function Setup() {
  const { firstName, refreshUserContext } = useContext(userContext);

  return (
    <Screen>
      <Header
        label="Setup"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Container>
        <Headline>Setup</Headline>
      </Container>
      <Container fill />
      <Footer />
    </Screen>
  );
}
