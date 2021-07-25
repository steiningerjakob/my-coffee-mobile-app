import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Rating } from 'react-native-ratings';
import { userContext } from '../App';
import ratingImage from '../assets/custom_bean.png';
import coverImage from '../assets/preferences-cover.jpeg';
import Button from '../components/Button';
import Container from '../components/Container';
import FloatingButton from '../components/FloatingButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline, Label, Paragraph } from '../components/Text';
import {
  clearPreference,
  getBeanTypes,
  getPreference,
  getRecommendations,
  insertPreference,
  updatePreference,
} from '../util/apiFunctions';
import { wait } from '../util/utilFunctions';

const preferencesStyles = StyleSheet.create({
  cover: {
    height: 160,
    width: '100%',
    resizeMode: 'contain',
  },
  message: {
    color: '#BC6C25',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 24,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden',
  },
  headline: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: '500',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: 290,
  },
  icon: { marginLeft: 'auto' },
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

export default function Preferences() {
  const navigation = useNavigation();
  const { id, firstName, refreshUserContext } = useContext(userContext);

  const [refreshing, setRefreshing] = useState(false);

  const [beanTypeSelectionIsActive, setBeanTypeSelectionIsActive] =
    useState(false);
  const [existingPreference, setExistingPreference] = useState(false);
  const [modalIsVisible, setModalVisible] = useState(false);
  const [recommendationsActive, setRecommendationsActive] = useState(false);

  const [beanTypes, setBeanTypes] = useState([]);
  const [userBeanType, setUserBeanType] = useState('');
  const [userBody, setUserBody] = useState();
  const [userIntensity, setUserIntensity] = useState();
  const [userAcidity, setUserAcidity] = useState();
  const [recommendations, setRecommendations] = useState([]);

  function beanTypeSelectionHandler(userInput) {
    setUserBeanType(userInput);
    setBeanTypeSelectionIsActive(!beanTypeSelectionIsActive);
  }

  function beanTypesSorter(a, b) {
    const beanTypeA = a.beanType;
    const beanTypeB = b.beanType;
    if (beanTypeA > beanTypeB) {
      return 1;
    }
    if (beanTypeA < beanTypeB) {
      return -1;
    }
  }

  function bodyStateHandler(userInput) {
    const inputForState = userInput;
    setUserBody(inputForState);
  }

  function intensityStateHandler(userInput) {
    const inputForState = userInput;
    setUserIntensity(inputForState);
  }

  function acidityStateHandler(userInput) {
    const inputForState = userInput;
    setUserAcidity(inputForState);
  }

  function editPreferencesButtonHandler() {
    setModalVisible(true);
    setUserBeanType('');
  }

  async function savePreferencesButtonHandler() {
    await insertPreference(
      id,
      userBeanType,
      userBody,
      userIntensity,
      userAcidity,
    );
    setExistingPreference(true);
    setModalVisible(false);
  }

  async function updatePreferencesButtonHandler() {
    await updatePreference(
      id,
      userBeanType,
      userBody,
      userIntensity,
      userAcidity,
    );
    setExistingPreference(true);
    setModalVisible(false);
  }

  async function clearPreferences() {
    await clearPreference(id);
    setUserBeanType(null);
    setExistingPreference(false);
  }

  function clearPreferencesButtonHandler() {
    Alert.alert(
      'Clear preferences',
      'Are you sure you want to clear your preferences?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            clearPreferences();
          },
        },
      ],
    );
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getRecommendations(userBody, userAcidity, userIntensity).then((d) =>
        setRecommendations(d.recommendations),
      );
      setRefreshing(false);
    });
  }, [userBody, userAcidity, userIntensity]);

  useFocusEffect(
    useCallback(() => {
      getBeanTypes().then((data) => {
        if (data) {
          const unSortedBeanTypes = data.beanTypes;
          const sortedBeanTypes = unSortedBeanTypes.sort(beanTypesSorter);
          setBeanTypes(sortedBeanTypes);
        }
      });
      getPreference().then((data) => {
        if (data) {
          setUserBeanType(data.beanType);
          setUserBody(data.body);
          setUserIntensity(data.intensity);
          setUserAcidity(data.acidity);
          setExistingPreference(true);

          getRecommendations(data.body, data.acidity, data.intensity).then(
            (d) => {
              setRecommendations(d.recommendations);
            },
          );
        } else {
          setExistingPreference(false);
        }
      });
    }, []),
  );

  return (
    <Screen>
      <Header
        label="Preferences"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {/* eslint-disable-next-line */}
      {!beanTypes && <Loading />}
      <Image source={coverImage} style={preferencesStyles.cover} />
      {existingPreference === false ? (
        <Container fill>
          <Container>
            <Text style={preferencesStyles.message}>
              You haven't entered your preferences yet...
            </Text>
          </Container>
          <Spacer />
          <Button
            label="enter preferences"
            onPress={editPreferencesButtonHandler}
          />
        </Container>
      ) : (
        <Container fill>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Container>
              <Headline>Your flavour profile</Headline>
              <View style={preferencesStyles.wrapper}>
                <Label>Body: </Label>
                <Rating
                  startingValue={userBody}
                  imageSize={24}
                  type="custom"
                  ratingImage={ratingImage}
                  ratingColor="#F7D6B1"
                  onFinishRating={bodyStateHandler}
                  readonly
                />
              </View>
              <View style={preferencesStyles.wrapper}>
                <Label>Acidity: </Label>
                <Rating
                  startingValue={userAcidity}
                  imageSize={24}
                  type="custom"
                  ratingImage={ratingImage}
                  ratingColor="#F7D6B1"
                  onFinishRating={acidityStateHandler}
                  readonly
                />
              </View>
              <View style={preferencesStyles.wrapper}>
                <Label>Intensity: </Label>
                <Rating
                  startingValue={userIntensity}
                  imageSize={24}
                  type="custom"
                  ratingImage={ratingImage}
                  ratingColor="#F7D6B1"
                  onFinishRating={intensityStateHandler}
                  readonly
                />
              </View>
            </Container>
            <Container>
              <Headline>Your bean type preferences</Headline>
              <Paragraph>{userBeanType}</Paragraph>
            </Container>
            <Spacer />
            <Container>
              <Button
                label="edit preferences"
                onPress={editPreferencesButtonHandler}
              />
              <TouchableOpacity onPress={clearPreferencesButtonHandler}>
                <Text style={preferencesStyles.clear}>Clear preferences</Text>
              </TouchableOpacity>
            </Container>

            <Container>
              <TouchableOpacity
                onPress={() => setRecommendationsActive(!recommendationsActive)}
              >
                <View style={preferencesStyles.heading}>
                  <Text style={preferencesStyles.headline}>
                    Our recommendations
                  </Text>
                  <AntDesign
                    name="down"
                    size={24}
                    color="black"
                    style={preferencesStyles.icon}
                  />
                </View>
              </TouchableOpacity>
              {recommendationsActive &&
                recommendations.map((bean) => (
                  <ListItem
                    key={bean.id}
                    item={bean}
                    onPress={() => navigation.navigate('Detail', { bean })}
                  />
                ))}
            </Container>
          </ScrollView>
        </Container>
      )}

      {modalIsVisible && (
        <Modal
          visible={modalIsVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          style={{ flex: 1 }}
        >
          <View style={preferencesStyles.cancel}>
            <Entypo
              name="cross"
              size={36}
              color="#BC6C25"
              onPress={() => setModalVisible(false)}
            />
          </View>
          <Spacer large />
          <Spacer large />
          <Container fill>
            <Headline>Select flavour profile</Headline>
            <View style={preferencesStyles.wrapper}>
              <Label>Body: </Label>
              <Rating
                startingValue={0}
                imageSize={24}
                type="custom"
                ratingImage={ratingImage}
                ratingColor="#F7D6B1"
                onFinishRating={bodyStateHandler}
              />
            </View>
            <View style={preferencesStyles.wrapper}>
              <Label>Acidity: </Label>
              <Rating
                startingValue={0}
                imageSize={24}
                type="custom"
                ratingImage={ratingImage}
                ratingColor="#F7D6B1"
                onFinishRating={acidityStateHandler}
              />
            </View>
            <View style={preferencesStyles.wrapper}>
              <Label>Intensity: </Label>
              <Rating
                startingValue={0}
                imageSize={24}
                type="custom"
                ratingImage={ratingImage}
                ratingColor="#F7D6B1"
                onFinishRating={intensityStateHandler}
              />
            </View>

            <Container>
              <TouchableOpacity
                onPress={() =>
                  setBeanTypeSelectionIsActive(!beanTypeSelectionIsActive)
                }
              >
                {userBeanType ? (
                  <>
                    <View style={preferencesStyles.heading}>
                      <Text style={preferencesStyles.headline}>
                        Selected bean type:
                      </Text>
                    </View>
                    <Paragraph>{userBeanType}</Paragraph>
                  </>
                ) : (
                  <View style={preferencesStyles.heading}>
                    <Text style={preferencesStyles.headline}>
                      Select bean type
                    </Text>
                    <AntDesign
                      name="down"
                      size={24}
                      color="black"
                      style={preferencesStyles.icon}
                    />
                  </View>
                )}
              </TouchableOpacity>
              {beanTypeSelectionIsActive === true && (
                <FlatList
                  data={beanTypes}
                  keyExtractor={(item) => item.beanType.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={preferencesStyles.selectionWrapper}
                      onPress={() => beanTypeSelectionHandler(item.beanType)}
                    >
                      <Text>{item.beanType}</Text>
                      <Feather
                        name="circle"
                        size={24}
                        color="lightgray"
                        style={preferencesStyles.icon}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            </Container>
          </Container>
          {/* eslint-disable-next-line */}
          {userBeanType && userAcidity && userBody && userIntensity ? (
            existingPreference ? (
              <Container>
                <FloatingButton
                  label="Update preferences"
                  onPress={updatePreferencesButtonHandler}
                  bottom
                />
              </Container>
            ) : (
              <Container>
                <FloatingButton
                  label="Save preferences"
                  onPress={savePreferencesButtonHandler}
                  bottom
                />
              </Container>
            )
          ) : (
            // eslint-disable-next-line
            <Text>{''}</Text>
          )}
        </Modal>
      )}
      <Footer firstName={firstName} />
    </Screen>
  );
}
