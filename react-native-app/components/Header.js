import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const headerStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#BC6C25',
  },
  wrapper: {
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 4,
    paddingBottom: 8,
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

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={headerStyles.safeAreaView}>
      <View style={headerStyles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={headerStyles.label}>Go back</Text>
        </TouchableOpacity>
        <Text style={headerStyles.label}>{props.label}</Text>
        <Text style={headerStyles.label}>Hello {props.firstName}</Text>
      </View>
    </SafeAreaView>
  );
}
