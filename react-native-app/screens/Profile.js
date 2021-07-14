import { AntDesign } from '@expo/vector-icons';
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
import {
  checkProfileImageStatus,
  updateProfileImage,
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
  const CLOUDINARY_URL =
    'https://api.cloudinary.com/v1_1/my-coffee-mobile-app/upload';
  const UPLOAD_PRESET = 'jvjj9h8z';

  const { id, firstName, refreshUserContext } = useContext(userContext);

  const [profileImage, setProfileImage] = useState(null);

  // Source: https://dev.to/joypalumbo/uploading-images-to-cloudinary-in-react-native-using-cloudinary-s-api-37mo
  async function selectProfileImage() {
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
      // }
    }
    // setSelectedImage({localUri: result.uri});

    const base64Img = `data:image/jpg;base64,${result.base64}`;
    const data = {
      file: base64Img,
      upload_preset: UPLOAD_PRESET,
    };

    // send image to cloudinary and fetch url
    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async (r) => {
        const image = await r.json();
        setProfileImage(image.url);
        updateProfileImage(id, image.url);
      })
      .catch((err) => console.log(err));
  }

  useFocusEffect(
    useCallback(() => {
      checkProfileImageStatus(id).then((result) => {
        if (result) {
          setProfileImage(result.profileImage);
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
              <AntDesign name="camerao" size={32} color="lightgray" />
              <Text style={profileImageStyles.text}>Upload image</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={selectProfileImage}
              style={profileImageStyles.wrapper}
            >
              <Image
                source={{ uri: profileImage }}
                style={profileImageStyles.image}
              />
            </TouchableOpacity>
          )}
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
