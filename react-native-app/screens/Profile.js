import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useContext, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { userContext } from '../App';
import Button from '../components/Button';
import Container from '../components/Container';
import FloatingButton from '../components/FloatingButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline, Paragraph } from '../components/Text';
import { apiBaseUrl } from '../util/apiBaseUrl';
import {
  checkProfileImageStatus,
  deleteUser,
  getPreference,
  getUserFavourites,
  getUserSetup,
  logoutUser,
  updateUser,
} from '../util/apiFunctions';

const profileStyles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  imageWrapper: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderColor: 'lightgray',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLabel: {
    textAlign: 'center',
    color: 'lightgray',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '100%',
  },
  title: { fontSize: 24, color: 'black', textAlign: 'left' },
  icon: {
    marginLeft: 'auto',
  },
  prefixWrapper: {
    width: 48,
    alignContent: 'flex-start',
  },
  prefix: {
    marginRight: 12,
    fontSize: 24,
    color: '#BC6C25',
  },
  clear: {
    color: '#BC6C25',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  cancel: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
});

export default function Profile() {
  const navigation = useNavigation();

  const { id, firstName, email, refreshUserContext } = useContext(userContext);

  const [profileImage, setProfileImage] = useState(null);
  const [userSetup, setUserSetup] = useState(false);
  const [userPreferences, setUserPreferences] = useState(false);
  const [userFavourites, setUserFavourites] = useState([]);

  const [draftFirstName, setDraftFirstName] = useState('');
  const [draftLastName, setDraftLastName] = useState('');
  const [draftEmail, setDraftEmail] = useState('');
  const [draftPassword, setDraftPassword] = useState('');

  const [outputFirstName, setOutputFirstName] = useState(firstName);
  const [outputEmail, setOutputEmail] = useState(email);

  const [loading, setLoading] = useState(false);
  const [modalIsVisible, setModalVisible] = useState(false);

  // Source: https://dev.to/joypalumbo/uploading-images-to-cloudinary-in-react-native-using-cloudinary-s-api-37mo
  async function selectProfileImage() {
    setLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      setLoading(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      // required for Cloudinary:
      base64: true,
    });
    if (result.cancelled === true) {
      setLoading(false);
      return;
    }

    const base64Img = `data:image/jpg;base64,${result.base64}`;

    const response = await fetch(`${apiBaseUrl}/actions/image`, {
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
      setLoading(false);
    }
  }

  function editButtonHandler() {
    setModalVisible(true);
  }

  async function updateUserProfileHandler() {
    await updateUser(
      id,
      draftFirstName,
      draftLastName,
      draftEmail,
      draftPassword,
    );

    setOutputEmail(draftEmail);
    setOutputFirstName(draftFirstName);
    setModalVisible(false);
  }

  function deleteProfileHandler() {
    Alert.alert(
      'Delete profile',
      'Are you sure you want to delete your user profile? This cannot be undone..',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteUser(outputEmail ? outputEmail : email);
            logoutUser();
            refreshUserContext(true);
          },
        },
      ],
    );
  }

  useFocusEffect(
    useCallback(() => {
      checkProfileImageStatus().then((result) => {
        if (result) {
          setProfileImage(result.profileImage);
        }
      });
      getUserSetup().then((setup) => {
        if (setup.userSetup) {
          setUserSetup(setup.userSetup);
        }
      });
      getPreference().then((preference) => {
        if (preference.beanType) {
          setUserPreferences(preference.beanType);
        }
      });
      getUserFavourites().then((data) => {
        if (data) {
          setUserFavourites(data.userFavourites);
        }
      });
    }, []),
  );

  return (
    <Screen>
      <Header
        label="Profile"
        firstName={outputFirstName}
        refreshUserContext={refreshUserContext}
        noGoBack
      />

      <Container fill>
        <Container>
          <Headline>Welcome back, {outputFirstName}!</Headline>
          <Spacer />
          {/* eslint-disable-next-line */}
          {!profileImage ? (
            <TouchableOpacity
              onPress={selectProfileImage}
              style={profileStyles.imageWrapper}
            >
              {loading ? (
                <Loading label="Loading..." />
              ) : (
                <>
                  <AntDesign name="camerao" size={32} color="lightgray" />
                  <Text style={profileStyles.imageLabel}>Upload image</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={selectProfileImage}
              style={profileStyles.imageWrapper}
            >
              {loading ? (
                <Loading label="Loading..." />
              ) : (
                <Image
                  source={{ uri: profileImage }}
                  style={profileStyles.image}
                />
              )}
            </TouchableOpacity>
          )}
        </Container>
        <Container>
          <TouchableOpacity
            style={profileStyles.wrapper}
            onPress={() => navigation.navigate('Favourites')}
          >
            <View style={profileStyles.prefixWrapper}>
              <Text style={profileStyles.prefix}>
                ({userFavourites.length})
              </Text>
            </View>
            <Text style={profileStyles.title}>My list</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={profileStyles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={profileStyles.wrapper}
            onPress={() => navigation.navigate('Preferences')}
          >
            <View style={profileStyles.prefixWrapper}>
              {userPreferences ? (
                <Ionicons
                  name="checkmark-circle"
                  style={profileStyles.prefix}
                />
              ) : (
                <Ionicons
                  name="checkmark-circle-outline"
                  style={profileStyles.prefix}
                />
              )}
            </View>
            <Text style={profileStyles.title}>My preferences</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={profileStyles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={profileStyles.wrapper}
            onPress={() => navigation.navigate('Setup')}
          >
            <View style={profileStyles.prefixWrapper}>
              {userSetup.length > 0 ? (
                <Ionicons
                  name="checkmark-circle"
                  style={profileStyles.prefix}
                />
              ) : (
                <Ionicons
                  name="checkmark-circle-outline"
                  style={profileStyles.prefix}
                />
              )}
            </View>
            <Text style={profileStyles.title}>My setup</Text>
            <AntDesign
              name="right"
              size={24}
              color="black"
              style={profileStyles.icon}
            />
          </TouchableOpacity>
        </Container>
        <Container>
          <Button label="edit profile" onPress={editButtonHandler} />
          <TouchableOpacity onPress={deleteProfileHandler}>
            <Text style={profileStyles.clear}>Delete profile</Text>
          </TouchableOpacity>
        </Container>
      </Container>
      {modalIsVisible && (
        <Modal
          visible={modalIsVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          style={{ flex: 1 }}
        >
          <View style={profileStyles.cancel}>
            <Entypo
              name="cross"
              size={36}
              color="#BC6C25"
              onPress={() => setModalVisible(false)}
            />
          </View>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, alignItems: 'center' }}
            >
              <Spacer large />
              <Spacer />
              <Container fill>
                <Headline>Edit your profile details:</Headline>
                <Spacer />
                <Paragraph>First name:</Paragraph>
                <Input
                  value={draftFirstName}
                  onChangeText={(text) => setDraftFirstName(text)}
                  placeholder="New first name"
                  clearButtonMode="while-editing"
                  type="name"
                />
                <Spacer />
                <Spacer />
                <Paragraph>Last name:</Paragraph>
                <Input
                  value={draftLastName}
                  onChangeText={(text) => setDraftLastName(text)}
                  placeholder="New last name"
                  clearButtonMode="while-editing"
                  type="name"
                />
                <Spacer />
                <Spacer />
                <Paragraph>Username:</Paragraph>
                <Input
                  value={draftEmail}
                  onChangeText={(text) => setDraftEmail(text)}
                  placeholder="New username"
                  clearButtonMode="while-editing"
                  type="name"
                />
                <Spacer />
                <Spacer />
                <Paragraph>Password:</Paragraph>
                <Input
                  value={draftPassword}
                  onChangeText={(text) => setDraftPassword(text)}
                  placeholder="New password"
                  clearButtonMode="while-editing"
                  secureTextEntry={true}
                />
                <Spacer large />
                <Spacer large />
                <Spacer large />
              </Container>
            </KeyboardAvoidingView>
          </ScrollView>
          <Container>
            <FloatingButton
              label="Update profile details"
              disabled={
                !draftFirstName | !draftLastName | !draftEmail | !draftPassword
              }
              onPress={updateUserProfileHandler}
              bottom
            />
          </Container>
        </Modal>
      )}
      <Footer firstName={outputFirstName} />
    </Screen>
  );
}
