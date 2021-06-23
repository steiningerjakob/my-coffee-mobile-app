import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import logo from '../assets/cover.png';
import Button from '../components/Button';
import ImagePreview from '../components/ImagePreview';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <Fragment>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ImagePreview source={logo} />
        <Spacer />
        <Headline>Welcome to the home of coffee!</Headline>
        <Spacer />
        <Spacer />
        <Spacer />
        <Button
          label={'Sign up'}
          onPress={() => navigation.navigate('SignUp')}
        />
        <Spacer />
        <Button
          label={'Sign in'}
          variant
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEEE',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
});
