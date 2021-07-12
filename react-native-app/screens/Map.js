import * as React from 'react';
import { useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Callout, Marker } from 'react-native-maps';
import { userContext } from '../App';
import locationIcon from '../assets/location-icon.png';
import image from '../assets/tasteit.jpeg';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RatingElement from '../components/RatingElement';
import Screen from '../components/Screen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  map: {
    width: width,
    height: height,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
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
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 80,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    elevation: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  buttonWrapper: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 260,
    borderColor: '#BC6C25',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#BC6C25',
  },
});

// to be replaced with seller data from database
const markers = [
  {
    coordinate: {
      latitude: 48.21814697919488,
      longitude: 16.387685918728474,
    },
    title: 'Amazing Food Place',
    description: 'This is the best food place',
    image: { image },
    rating: 4,
    reviews: 99,
  },
  {
    coordinate: {
      latitude: 48.23814697919488,
      longitude: 16.367685918728474,
    },
    title: 'Second Amazing Food Place',
    description: 'This is the second best food place',
    image: { image },
    rating: 5,
    reviews: 102,
  },
  {
    coordinate: {
      latitude: 48.23314697919488,
      longitude: 16.3727685918728474,
    },
    title: 'Third Amazing Food Place',
    description: 'This is the third best food place',
    image: { image },
    rating: 3,
    reviews: 220,
  },
  {
    coordinate: {
      latitude: 48.21314697919488,
      longitude: 16.3827685918728474,
    },
    title: 'Fourth Amazing Food Place',
    description: 'This is the fourth best food place',
    image: { image },
    rating: 4,
    reviews: 48,
  },
  {
    coordinate: {
      latitude: 48.19814697919488,
      longitude: 16.365685918728474,
    },
    title: 'Fifth Amazing Food Place',
    description: 'This is the fifth best food place',
    image: { image },
    rating: 4,
    reviews: 178,
  },
];

export default function Map() {
  const { firstName, refreshUserContext } = useContext(userContext);

  const ASPECT_RATIO = width / height;
  console.log(ASPECT_RATIO);
  const LATITUDE = 48.2082;
  const LONGITUDE = 16.3738;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState({
    latitude: LATITUDE, // initial location latitude
    longitude: LONGITUDE, // initial location longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  return (
    <Screen>
      <Header
        label="Store finder"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <View style={mapStyles.container}>
        <MapView
          style={mapStyles.map}
          initialRegion={region}
          onRegionChange={(location) => setRegion(location)}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.title}
              coordinate={marker.coordinate}
              image={locationIcon}
              title={marker.title}
              description={marker.description}
            >
              <Callout tooltip>
                <View style={mapStyles.bubble}>
                  <Text style={mapStyles.name}>TasteIt Wollzeile</Text>
                  <Image style={mapStyles.image} source={image} />
                </View>
                <View style={mapStyles.arrowBorder} />
                <View style={mapStyles.arrow} />
              </Callout>
            </Marker>
          ))}
        </MapView>
        <ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={mapStyles.scrollView}
          pagingEnabled
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
        >
          {markers.map((marker) => (
            <View style={mapStyles.card} key={marker.title}>
              <Image
                source={image}
                style={mapStyles.cardImage}
                resizeMode="cover"
              />
              <View style={mapStyles.textContent}>
                <Text numberOfLines={1} style={mapStyles.cardTitle}>
                  {marker.title}
                </Text>
                <RatingElement
                  startingValue={marker.rating}
                  readonly
                  onFinishRating={() => {}}
                  reviews={marker.reviews}
                />
                <View style={mapStyles.button}>
                  <TouchableOpacity
                    style={mapStyles.buttonWrapper}
                    onPress={() => {}}
                  >
                    <Text style={mapStyles.buttonText}>See details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <Footer />
    </Screen>
  );
}
