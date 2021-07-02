import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import { Headline } from '../components/Text';
import { apiBaseUrl } from '../util/apiBaseUrl';

const redirectStyles = StyleSheet.create({
  redirect: {
    color: '#BC6C25',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 24,
  },
});

export default function Favourites() {
  const navigation = useNavigation();
  const { firstName, id, refreshUserContext } = useContext(userContext);
  const [userFavourites, setUserFavourites] = useState([]);

  async function getUserFavourites() {
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

  function redirectHandler() {
    navigation.navigate('Home');
  }

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
                  key={bean.id}
                  item={bean}
                  onPress={() => navigation.navigate('Detail', { bean })}
                />
              ))}
            </Container>
          </ScrollView>
        ) : (
          <TouchableOpacity onPress={redirectHandler}>
            <Text style={redirectStyles.redirect}>
              Nothing here yet... browse through our world of coffee and select
              your favourites!
            </Text>
          </TouchableOpacity>
        )}
      </Container>
      <Footer />
    </Screen>
  );
}
