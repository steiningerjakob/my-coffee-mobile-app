import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logoutUser } from '../util/apiFunctions';

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
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    maxWidth: 240,
  },
});

export default function Header(props) {
  const navigation = useNavigation();

  async function logoutButtonHandler() {
    await logoutUser();

    // pass in true as an argument to clear cookie
    props.refreshUserContext(true);
  }

  return (
    <SafeAreaView style={headerStyles.safeAreaView}>
      <View style={headerStyles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={headerStyles.label} numberOfLines={1}>
          {props.label}
        </Text>
        {props.firstName ? (
          <TouchableOpacity onPress={() => logoutButtonHandler()}>
            <MaterialIcons name="logout" size={32} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <MaterialIcons name="login" size={32} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
