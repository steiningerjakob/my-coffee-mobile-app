import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const footerStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#BC6C25',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  wrapperRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  scanner: {
    borderRadius: 100,
    backgroundColor: 'white',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    overflow: 'visible',
  },
  label: {
    fontSize: 8,
    color: 'white',
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});

export default function Footer() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={footerStyles.safeAreaView}>
      <View style={footerStyles.container}>
        <View style={footerStyles.wrapperLeft}>
          <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
            <AntDesign name="staro" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
            <AntDesign name="search1" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <View style={footerStyles.scanner}>
          <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
            <MaterialCommunityIcons
              name="barcode-scan"
              size={32}
              color="#BC6C25"
            />
          </TouchableOpacity>
        </View>
        <View style={footerStyles.wrapperRight}>
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <Ionicons name="ios-map-outline" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <AntDesign name="user" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
