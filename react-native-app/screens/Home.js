import React, { useContext } from 'react';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';

export default function Home() {
  const { firstName, refreshUserContext } = useContext(userContext);
  console.log('refreshUserContext Home', refreshUserContext);

  return (
    <Screen>
      <Header
        label="Home"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Container>
        <Headline>Welcome back, {firstName}</Headline>
      </Container>
      <Spacer />
      <Footer />
    </Screen>
  );
}
