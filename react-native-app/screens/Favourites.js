import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import { Headline, Paragraph } from '../components/Text';

export default function Favourites() {
  const navigation = useNavigation();
  const { firstName, id, refreshUserContext } = useContext(userContext);
  const [userFavourites, setUserFavourites] = useState([]);
  console.log('state variable', userFavourites);
  console.log('type of state variable', typeof userFavourites);

  async function getUserFavourites() {
    const { manifest } = Constants;

    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `jakobs-mobile-coffee-app.herokuapp.com`;

    const apiBaseUrl =
      apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
        ? `https:${apiBaseUrlDraft}`
        : `http:${apiBaseUrlDraft}`;

    const response = await fetch(`${apiBaseUrl}/actions/get_favourites`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
      }),
    });

    const favourites = await response.json();
    return favourites;
  }

  useFocusEffect(
    useCallback(() => {
      getUserFavourites().then((data) => {
        if (data) {
          setUserFavourites(data.userFavourites);
        }
      });
    }, []),
  );

  return (
    <Screen>
      <Header
        label="Favourites"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Container>
        <Headline>{firstName}'s favourites</Headline>
      </Container>
      <Container fill>
        {userFavourites.length > 0 ? (
          <ScrollView style={{ flex: 1 }}>
            <Container>
              {userFavourites.map((bean) => (
                <ListItem
                  key={bean.favouritesBeanId}
                  item={bean}
                  onPress={() => navigation.navigate('Detail', { bean })}
                />
              ))}
            </Container>
          </ScrollView>
        ) : (
          <Paragraph>
            Nothing here yet... browse through our world of coffee and select
            your favourites!
          </Paragraph>
        )}
      </Container>
      <Footer />
    </Screen>
  );
}
