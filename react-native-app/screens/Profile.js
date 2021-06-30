import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { userContext } from '../App';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import { Headline, Paragraph } from '../components/Text';

const linkStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: 320,
  },
  title: { fontSize: 24, color: 'black', textAlign: 'left' },
  icon: {
    marginLeft: 'auto',
  },
});

export default function Profile() {
  const navigation = useNavigation();

  const { firstName, lastName, email, refreshUserContext } =
    useContext(userContext);

  return (
    <Screen>
      <Header
        label="Profile"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Container fill>
        <Container>
          <Headline>Welcome back, {firstName}</Headline>
          <Headline>Profile details:</Headline>
          <Paragraph>First name: {firstName}</Paragraph>
          <Paragraph>Last name: {lastName}</Paragraph>
          <Paragraph>Email: {email}</Paragraph>
        </Container>
        <Container>
          <TouchableOpacity
            style={linkStyles.wrapper}
            onPress={() => navigation.navigate('Favourites')}
          >
            <Text style={linkStyles.title}>My favourites</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={linkStyles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={linkStyles.wrapper}
            onPress={() => navigation.navigate('Preferences')}
          >
            <Text style={linkStyles.title}>My preferences</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={linkStyles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={linkStyles.wrapper}
            onPress={() => navigation.navigate('Setup')}
          >
            <Text style={linkStyles.title}>My setup</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={linkStyles.icon}
            />
          </TouchableOpacity>
        </Container>
      </Container>
      <Footer />
    </Screen>
  );
}
