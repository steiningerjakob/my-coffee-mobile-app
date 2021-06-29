import React, { useContext } from 'react';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import { Headline } from '../components/Text';

export default function List() {
  const { firstName } = useContext(userContext);

  return (
    <Screen>
      <Header label="Product list" firstName={firstName} />
      <Container>
        <Headline>Product list</Headline>
      </Container>
      <Footer />
    </Screen>
  );
}
