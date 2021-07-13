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
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
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
      <View style={footerStyles.wrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
          <AntDesign name="staro" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
          <AntDesign name="search1" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
          <MaterialCommunityIcons name="barcode-scan" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Ionicons name="ios-map-outline" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <AntDesign name="user" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
