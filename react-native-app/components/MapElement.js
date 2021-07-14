import * as Linking from 'expo-linking';
import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { Rating } from 'react-native-ratings';
// Icon by <a href='https://iconpacks.net/?utm_source=link-attribution&utm_content=2955'>Iconpacks</a>
import locationIcon from '../assets/location-icon.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;

const mapStyles = StyleSheet.create({
  map: {
    width: width,
    height: height,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 160,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: 'white',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#BC6C25',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 80,
  },
  cardText: {
    fontSize: 12,
  },
  cardLineItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default function MapElement(props) {
  const lat = props.location.coords.latitude;
  const long = props.location.coords.longitude;
  const LATITUDE_DELTA = 0.15;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const region = {
    latitude: lat,
    longitude: long,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <MapView style={mapStyles.map} initialRegion={region}>
      {props.sellers.length > 0 &&
        props.sellers.map((seller) => (
          <Marker
            key={seller.id}
            coordinate={{
              latitude: Number(seller.latitude),
              longitude: Number(seller.longitude),
            }}
            image={locationIcon}
            title={seller.sellerName}
            description={seller.sellerDescription}
            onPress={() => {
              props.onPress(seller.sellerName);
            }}
          >
            <Callout tooltip onPress={() => Linking.openURL(seller.website)}>
              <View style={mapStyles.bubble}>
                <Text style={mapStyles.name}>{seller.sellerName}</Text>
                <View style={mapStyles.cardLineItem}>
                  <Rating
                    startingValue={seller.rating}
                    readonly
                    imageSize={16}
                  />
                  <Text style={mapStyles.cardText}>({seller.reviews})</Text>
                </View>
                <Image style={mapStyles.image} source={{ uri: seller.uri }} />
              </View>
              <View style={mapStyles.arrowBorder} />
              <View style={mapStyles.arrow} />
            </Callout>
          </Marker>
        ))}
    </MapView>
  );
}
