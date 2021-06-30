import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const footerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
  },
  safeAreaView: {
    backgroundColor: '#BC6C25',
  },
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default function Footer() {
  const navigation = useNavigation();
  return (
    <View style={footerStyles.container}>
      <SafeAreaView style={footerStyles.safeAreaView}>
        <View style={footerStyles.wrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
            <AntDesign name="staro" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <AntDesign name="home" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <AntDesign name="user" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
