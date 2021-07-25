import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const width = Dimensions.get('window').width;
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;

const mapStyles = StyleSheet.create({
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

export default function Card(props) {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      style={mapStyles.scrollView}
      snapToInterval={CARD_WIDTH + 20}
      snapToAlignment="center"
    >
      {props.sellerBeans.map((bean) => (
        <View style={mapStyles.card} key={bean.id}>
          <Image
            source={{ uri: bean.uri }}
            style={mapStyles.cardImage}
            resizeMode="contain"
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
                {(Number(bean.price) / Number(bean.amount)).toFixed(2)} €/kg
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
  );
}
