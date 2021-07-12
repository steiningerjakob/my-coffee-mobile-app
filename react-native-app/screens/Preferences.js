import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { userContext } from '../App';
import ratingImage from '../assets/custom_bean.png';
import coverImage from '../assets/preferences-cover.jpeg';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import Separator from '../components/Separator';
import Spacer from '../components/Spacer';
import { Headline, Label } from '../components/Text';
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
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomColor: '#F9DFC2',
    borderBottomWidth: 1,
    width: '90%',
    paddingLeft: 16,
    paddingRight: 16,
    overflow: 'hidden',
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
});

export default function Preferences() {
  const navigation = useNavigation();
  const { id, firstName, refreshUserContext } = useContext(userContext);

  const [refreshing, setRefreshing] = useState(false);

  const [beanTypeSelectionIsActive, setBeanTypeSelectionIsActive] =
    useState(false);
  const [existingPreference, setExistingPreference] = useState(false);
  const [beanTypes, setBeanTypes] = useState([]);
  const [userBeanType, setUserBeanType] = useState('');
  const [userBody, setUserBody] = useState();
  const [userFruit, setUserFruit] = useState();
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

  function fruitStateHandler(userInput) {
    const inputForState = userInput;
    setUserFruit(inputForState);
  }

  function acidityStateHandler(userInput) {
    const inputForState = userInput;
    setUserAcidity(inputForState);
  }

  function savePreferencesButtonHandler() {
    insertPreference(id, userBeanType, userBody, userFruit, userAcidity);
    setExistingPreference(true);
  }

  function updatePreferencesButtonHandler() {
    updatePreference(id, userBeanType, userBody, userFruit, userAcidity);
    setExistingPreference(true);
  }

  async function clearPreferences() {
    clearPreference(id);
    setExistingPreference(false);
    setUserBeanType('');
    setUserBody();
    setUserFruit();
    setUserAcidity();
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
      getRecommendations(userBody, userAcidity, userFruit).then((d) =>
        setRecommendations(d.recommendations),
      );
      setRefreshing(false);
    });
  }, [userBody, userAcidity, userFruit]);

  useFocusEffect(
    useCallback(() => {
      getBeanTypes().then((data) => {
        if (data) {
          const unSortedBeanTypes = data.beanTypes;
          const sortedBeanTypes = unSortedBeanTypes.sort(beanTypesSorter);
          setBeanTypes(sortedBeanTypes);
        }
      });
      getPreference(id).then((data) => {
        if (data) {
          setUserBeanType(data.beanType);
          setUserBody(data.body);
          setUserFruit(data.fruit);
          setUserAcidity(data.acidity);
          setExistingPreference(true);

          getRecommendations(data.body, data.acidity, data.fruit).then((d) => {
            setRecommendations(d.recommendations);
          });
        } else {
          setExistingPreference(false);
        }
      });
    }, [id]),
  );

  return (
    <Screen>
      <Header
        label="Preferences"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {!beanTypes.length ? (
        <Loading />
      ) : (
        <>
          <Image source={coverImage} style={preferencesStyles.cover} />
          <Container fill>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {existingPreference === false ? (
                <>
                  <Container>
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
                      <Label>Fruit: </Label>
                      <Rating
                        startingValue={0}
                        imageSize={24}
                        type="custom"
                        ratingImage={ratingImage}
                        ratingColor="#F7D6B1"
                        onFinishRating={fruitStateHandler}
                      />
                    </View>
                  </Container>
                  <Container>
                    <TouchableOpacity
                      onPress={() =>
                        setBeanTypeSelectionIsActive(!beanTypeSelectionIsActive)
                      }
                    >
                      <View style={preferencesStyles.heading}>
                        {userBeanType ? (
                          <Headline>{userBeanType}</Headline>
                        ) : (
                          <Headline>Select bean type</Headline>
                        )}
                        <AntDesign
                          name="down"
                          size={24}
                          color="black"
                          style={preferencesStyles.icon}
                        />
                      </View>
                    </TouchableOpacity>
                    {beanTypeSelectionIsActive === true &&
                      beanTypes.map((b) => (
                        <TouchableOpacity
                          key={b.beanType}
                          style={preferencesStyles.selectionWrapper}
                          onPress={() => beanTypeSelectionHandler(b.beanType)}
                        >
                          <Text>{b.beanType}</Text>
                        </TouchableOpacity>
                      ))}
                  </Container>
                  <Container>
                    <Button
                      label="Save preferences"
                      disabled={
                        !userBeanType | !userAcidity | !userBody | !userFruit
                      }
                      onPress={savePreferencesButtonHandler}
                    />
                  </Container>
                </>
              ) : (
                <>
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
                      />
                    </View>
                    <View style={preferencesStyles.wrapper}>
                      <Label>Fruit: </Label>
                      <Rating
                        startingValue={userFruit}
                        imageSize={24}
                        type="custom"
                        ratingImage={ratingImage}
                        ratingColor="#F7D6B1"
                        onFinishRating={fruitStateHandler}
                      />
                    </View>
                  </Container>
                  <Container>
                    <TouchableOpacity
                      onPress={() =>
                        setBeanTypeSelectionIsActive(!beanTypeSelectionIsActive)
                      }
                    >
                      <View style={preferencesStyles.heading}>
                        <Headline>{userBeanType}</Headline>
                        <AntDesign
                          name="down"
                          size={24}
                          color="black"
                          style={preferencesStyles.icon}
                        />
                      </View>
                    </TouchableOpacity>
                    {beanTypeSelectionIsActive === true &&
                      beanTypes.map((b) => (
                        <TouchableOpacity
                          key={b.beanType}
                          style={preferencesStyles.selectionWrapper}
                          onPress={() => beanTypeSelectionHandler(b.beanType)}
                        >
                          <Text>{b.beanType}</Text>
                        </TouchableOpacity>
                      ))}
                  </Container>
                  <Container>
                    <Button
                      label="Update preferences"
                      disabled={
                        !userBeanType | !userAcidity | !userBody | !userFruit
                      }
                      onPress={updatePreferencesButtonHandler}
                    />
                    <TouchableOpacity onPress={clearPreferencesButtonHandler}>
                      <Text style={preferencesStyles.clear}>
                        Clear preferences
                      </Text>
                    </TouchableOpacity>
                  </Container>
                  <Spacer />
                  <Spacer />
                  <Separator />
                  <Spacer />
                  <Container>
                    <Headline>Our recommendations for you:</Headline>
                    {recommendations.map((bean) => (
                      <ListItem
                        key={bean.id}
                        item={bean}
                        onPress={() => navigation.navigate('Detail', { bean })}
                      />
                    ))}
                  </Container>
                </>
              )}
            </ScrollView>
          </Container>
        </>
      )}
      <Footer />
    </Screen>
  );
}
