import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as React from 'react';
import { useCallback, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { userContext } from '../App';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MapElement from '../components/MapElement';
import Screen from '../components/Screen';
import { getBeansBySeller, getSellers } from '../util/apiFunctions';

// adapted from: https://www.youtube.com/watch?v=2vILzRmEqGI

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
});

export default function Map() {
  const { firstName, refreshUserContext } = useContext(userContext);

  const [sellers, setSellers] = useState([]);
  const [sellerBeans, setSellerBeans] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  function onMarkerPress(sellerName) {
    setSelectedSeller(sellerName);
  }

  useFocusEffect(
    useCallback(() => {
      getSellers().then((result) => {
        if (result) {
          setSellers(result.sellers);
        }
      });
      getBeansBySeller(selectedSeller).then((result) => {
        if (result) {
          setSellerBeans(result.beans);
        }
      });
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg(
            'Permission to access location was denied, assuming Vienna as default location.',
          );
          const viennaCoords = {
            coords: {
              latitude: 48.21565742521307,
              longitude: 16.347838098192824,
            },
          };
          setLocation(viennaCoords);
          alert(errorMsg);
        }
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
      })();
    }, [selectedSeller]),
  );

  return (
    <Screen>
      <Header
        label="Store finder"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {sellers.length === 0 || !location ? (
        <Loading label="Fetching your location, hang tight..." />
      ) : (
        <View style={mapStyles.container}>
          <MapElement
            sellers={sellers}
            onPress={onMarkerPress}
            location={location}
          />
          {sellerBeans.length === 0 ? (
            <Loading />
          ) : (
            <Card sellerBeans={sellerBeans} />
          )}
        </View>
      )}
      <Footer />
    </Screen>
  );
}
