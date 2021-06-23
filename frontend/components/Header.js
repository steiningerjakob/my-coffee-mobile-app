import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const headerStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#BC6C25',
  },
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 4,
    paddingBottom: 8,
  },
  label: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default function Header(props) {
  return (
    <SafeAreaView style={headerStyles.safeAreaView}>
      <View style={headerStyles.wrapper}>
        <Text style={headerStyles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}
