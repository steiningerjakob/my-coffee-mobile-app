import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';
import { apiBaseUrl } from '../util/apiBaseUrl';
import {
  checkProfileImageStatus,
  getPreference,
  getUserFavourites,
  getUserSetups,
} from '../util/apiFunctions';

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
  prefix: {
    marginRight: 12,
    fontSize: 24,
    color: '#BC6C25',
  },
});

const profileImageStyles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  wrapper: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: 'lightgray',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'lightgray',
  },
});

export default function Profile() {
  const navigation = useNavigation();

  const { id, firstName, refreshUserContext } = useContext(userContext);

  const [profileImage, setProfileImage] = useState(null);
  const [userSetup, setUserSetup] = useState(false);
  const [userPreferences, setUserPreferences] = useState(false);
  const [userFavourites, setUserFavourites] = useState([]);

  const [loading, setLoading] = useState(false);

  // Source: https://dev.to/joypalumbo/uploading-images-to-cloudinary-in-react-native-using-cloudinary-s-api-37mo
  async function selectProfileImage() {
    setLoading(true);
    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(status);
    // if (status !== 'granted') {
    //   alert('Permission to access camera roll is required!');
    //   return;
    // } else {

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      // required for Cloudinary:
      base64: true,
    });
    if (result.cancelled === true) {
      return;
    }

    const base64Img = `data:image/jpg;base64,${result.base64}`;

    const response = await fetch(`${apiBaseUrl}/actions/upload_profile_image`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        base64Img: base64Img,
      }),
    });

    const data = await response.json();
    if (data) {
      setLoading(false);
      alert(data.message);
      setProfileImage(data.imageURL);
    } else {
      alert('Oops.. something went wrong');
    }
  }

  useFocusEffect(
    useCallback(() => {
      checkProfileImageStatus(id).then((result) => {
        if (result) {
          setProfileImage(result.profileImage);
        }
      });
      getUserSetups(id).then((setup) => {
        if (setup.userSetup) {
          setUserSetup(setup.userSetup);
        }
      });
      getPreference(id).then((preference) => {
        if (preference.beanType) {
          setUserPreferences(preference.beanType);
        }
      });
      getUserFavourites(id).then((data) => {
        if (data) {
          setUserFavourites(data.userFavourites);
        }
      });
    }, [id]),
  );

  return (
    <Screen>
      <Header
        label="Profile"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />

      <Container fill>
        <Container>
          <Headline>Welcome back, {firstName}!</Headline>
          <Spacer />
          {!profileImage ? (
            <TouchableOpacity
              onPress={selectProfileImage}
              style={profileImageStyles.wrapper}
            >
              {loading ? (
                <Loading label="Loading..." />
              ) : (
                <>
                  <AntDesign name="camerao" size={32} color="lightgray" />
                  <Text style={profileImageStyles.text}>Upload image</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={selectProfileImage}
              style={profileImageStyles.wrapper}
            >
              {loading ? (
                <Loading label="Loading..." />
              ) : (
                <Image
                  source={{ uri: profileImage }}
                  style={profileImageStyles.image}
                />
              )}
            </TouchableOpacity>
          )}
        </Container>
        <Container>
          <TouchableOpacity
            style={linkStyles.wrapper}
            onPress={() => navigation.navigate('Favourites')}
          >
            <Text style={linkStyles.prefix}>({userFavourites.length})</Text>
            <Text style={linkStyles.title}>My list</Text>
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
            {userPreferences ? (
              <Ionicons name="checkmark-circle" style={linkStyles.prefix} />
            ) : (
              <Ionicons
                name="checkmark-circle-outline"
                style={linkStyles.prefix}
              />
            )}
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
            {userSetup.length > 0 ? (
              <Ionicons name="checkmark-circle" style={linkStyles.prefix} />
            ) : (
              <Ionicons
                name="checkmark-circle-outline"
                style={linkStyles.prefix}
              />
            )}
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
