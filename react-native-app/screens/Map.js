import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useCallback, useContext, useState } from 'react';
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
import { Rating } from 'react-native-ratings';
import { userContext } from '../App';
// Icon by <a href='https://iconpacks.net/?utm_source=link-attribution&utm_content=2955'>Iconpacks</a>
import locationIcon from '../assets/location-icon.png';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import { getBeansBySeller, getSellers } from '../util/apiFunctions';

// adapted from: https://www.youtube.com/watch?v=2vILzRmEqGI

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width / height;
const CARD_HEIGHT = 200;
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
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
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
    display: 'flex',
    flexDirection: 'row',
  },
  cardEmpty: {
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  cardImage: {
    flex: 2.5,
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  cardTextWrapper: {
    flex: 2,
    padding: 10,
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 12,
  },
  cardIcon: {
    marginRight: 8,
  },
  cardLineItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 12,
  },
  button: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 12,
  },
  buttonWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#BC6C25',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#BC6C25',
  },
});

export default function Map() {
  const navigation = useNavigation();
  const { firstName, refreshUserContext } = useContext(userContext);

  const [sellers, setSellers] = useState([]);
  const [sellerBeans, setSellerBeans] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const LATITUDE = 48.2082;
  const LONGITUDE = 16.3738;
  const LATITUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState({
    latitude: LATITUDE, // initial location latitude
    longitude: LONGITUDE, // initial location longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

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
    }, [selectedSeller]),
  );

  return (
    <Screen>
      <Header
        label="Store finder"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {sellers.length === 0 ? (
        <Loading />
      ) : (
        <View style={mapStyles.container}>
          <MapView style={mapStyles.map} initialRegion={region}>
            {sellers.length > 0 &&
              sellers.map((seller) => (
                <Marker
                  key={seller.id}
                  coordinate={{
                    latitude: Number(seller.latitude),
                    longitude: Number(seller.longitude),
                  }}
                  image={locationIcon}
                  title={seller.sellerName}
                  description={seller.sellerDescription}
                  onPress={() => onMarkerPress(seller.sellerName)}
                >
                  <Callout tooltip>
                    <View style={mapStyles.bubble}>
                      <Text style={mapStyles.name}>{seller.sellerName}</Text>
                      <View style={mapStyles.cardLineItem}>
                        <Rating
                          startingValue={seller.rating}
                          readonly
                          imageSize={16}
                        />
                        <Text style={mapStyles.cardText}>
                          ({seller.reviews})
                        </Text>
                      </View>
                      <Image
                        style={mapStyles.image}
                        source={{ uri: seller.uri }}
                      />
                    </View>
                    <View style={mapStyles.arrowBorder} />
                    <View style={mapStyles.arrow} />
                  </Callout>
                </Marker>
              ))}
          </MapView>
          {sellerBeans.length === 0 ? (
            <Loading />
          ) : (
            <ScrollView
              horizontal
              pagingEnabled
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              style={mapStyles.scrollView}
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="center"
            >
              {sellerBeans.map((bean) => (
                <View style={mapStyles.card} key={bean.id}>
                  <Image
                    source={{ uri: bean.uri }}
                    style={mapStyles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={mapStyles.cardTextWrapper}>
                    <Text style={mapStyles.cardTitle} numberOfLines={2}>
                      {bean.productName}
                    </Text>
                    <Text>{bean.beanType}</Text>
                    <View style={mapStyles.cardLineItem}>
                      <Ionicons
                        name="ios-pricetag-outline"
                        size={24}
                        color="black"
                        style={mapStyles.cardIcon}
                      />
                      <Text>
                        {(Number(bean.price) / Number(bean.amount)).toFixed(2)}{' '}
                        €/kg
                      </Text>
                    </View>
                    <View style={mapStyles.button}>
                      <TouchableOpacity
                        style={mapStyles.buttonWrapper}
                        onPress={() => navigation.navigate('Detail', { bean })}
                      >
                        <Text style={mapStyles.buttonText}>Go to details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
      <Footer />
    </Screen>
  );
}
