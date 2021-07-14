import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { userContext } from '../App';
import coverImage from '../assets/favourites-cover.jpg';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItemFav from '../components/ListItemFav';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import { getUserFavourites } from '../util/apiFunctions';
import { wait } from '../util/utilFunctions';

const favouritesStyles = StyleSheet.create({
  redirect: {
    color: '#BC6C25',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 24,
  },
  image: {
    width: '100%',
    height: 154,
    resizeMode: 'contain',
  },
});

export default function Favourites() {
  const navigation = useNavigation();
  const { firstName, id, refreshUserContext } = useContext(userContext);

  const [refreshing, setRefreshing] = useState(false);

  const [userFavourites, setUserFavourites] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getUserFavourites(id).then((data) => {
        setUserFavourites(data.userFavourites);
      });
      setRefreshing(false);
    });
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      getUserFavourites(id).then((data) => {
        if (data) {
          setUserFavourites(data.userFavourites);
        }
      });
    }, [id]),
  );

  function redirectHandler() {
    navigation.navigate('Browse');
  }

  return (
    <Screen>
      <Header
        label="Favourites"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {!userFavourites ? (
        <Loading />
      ) : (
        <>
          <Image source={coverImage} style={favouritesStyles.image} />
          <Container fill>
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {userFavourites.length > 0 ? (
                <Container>
                  {userFavourites.map((bean) => (
                    <ListItemFav
                      key={bean.id}
                      item={bean}
                      onPress={() => navigation.navigate('Detail', { bean })}
                    />
                  ))}
                </Container>
              ) : (
                <TouchableOpacity onPress={redirectHandler}>
                  <Text style={favouritesStyles.redirect}>
                    Nothing here yet... browse through our world of coffee and
                    select your favourites!
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </Container>
        </>
      )}
      <Footer />
    </Screen>
  );
}
