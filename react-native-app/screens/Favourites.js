import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
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
  const { firstName, refreshUserContext } = useContext(userContext);

  const [refreshing, setRefreshing] = useState(false);

  const [userFavourites, setUserFavourites] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getUserFavourites().then((data) => {
        setUserFavourites(data.userFavourites);
      });
      setRefreshing(false);
    });
  }, []);

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
    navigation.navigate('Browse');
  }

  return (
    <Screen>
      <Header
        label="My coffee list"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Image source={coverImage} style={favouritesStyles.image} />
      <Container fill>
        {userFavourites.length > 0 ? (
          <FlatList
            data={userFavourites}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ListItemFav
                item={item}
                onPress={() => navigation.navigate('Detail', { bean: item })}
              />
            )}
          />
        ) : (
          <TouchableOpacity onPress={redirectHandler}>
            <Text style={favouritesStyles.redirect}>
              Nothing here yet... browse through our world of coffee and select
              your favourites!
            </Text>
          </TouchableOpacity>
        )}
      </Container>
      <Footer firstName={firstName} />
    </Screen>
  );
}
