import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { userContext } from '../App';
import ratingImage from '../assets/custom_bean.png';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImagePreview from '../components/ImagePreview';
import Input from '../components/Input';
import Loading from '../components/Loading';
import RatingElement from '../components/RatingElement';
import Screen from '../components/Screen';
import Separator from '../components/Separator';
import Spacer from '../components/Spacer';
import { Headline } from '../components/Text';
import {
  addBeansToFavourites,
  checkFavouriteStatus,
  checkReviewStatus,
  getFlavourProfile,
  insertReview,
  removeBeansFromFavourites,
  updateReview,
} from '../util/apiFunctions';

const detailStyles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
  },
  description: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
  },
  iconWrapper: {
    width: 64,
  },
  text: {
    fontSize: 16,
  },
});

export default function Detail(props) {
  const { params } = props.route;
  const { firstName, id, refreshUserContext } = useContext(userContext);

  const [isLoading, setLoading] = useState(true);
  const [flavourProfile, setFlavourProfile] = useState({});
  const [isFavourite, setFavourite] = useState();
  const [rating, setRating] = useState();
  const [review, setReview] = useState('');
  const [isReviewed, setReviewed] = useState(false);

  function addButtonHandler() {
    addBeansToFavourites(firstName, id, params.bean.id);
    setFavourite(true);
  }

  function removeButtonHandler() {
    removeBeansFromFavourites(id, params.bean.id);
    setFavourite(false);
  }

  function ratingStateHandler(userInput) {
    const inputForState = userInput;
    setRating(inputForState);
  }

  function saveReviewHandler() {
    insertReview(id, params.bean.id, rating, review);
    setReviewed(true);
  }

  async function updateReviewHandler() {
    updateReview(id, params.bean.id, rating, review);
    setReviewed(true);
  }

  useEffect(() => {
    getFlavourProfile(params.bean.flavourProfile).then((data) => {
      if (data) setFlavourProfile(data.flavour);
    });
    checkFavouriteStatus(id, params.bean.id).then((data) => {
      if (data) {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
    });
    checkReviewStatus(id, params.bean.id).then((data) => {
      if (data) {
        setReviewed(true);
        setRating(data.userRating);
        setReview(data.userReview);
      } else {
        setReviewed(false);
      }
    });
    setLoading(false);
  }, []);

  return (
    <Screen>
      <Header
        label={params.bean.productName}
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {isLoading === true ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, alignItems: 'center' }}
        >
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={detailStyles.favourite}>
              {isFavourite ? (
                <TouchableOpacity onPress={removeButtonHandler}>
                  <AntDesign name="star" size={40} color="#BC6C25" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={addButtonHandler}>
                  <AntDesign name="staro" size={40} color="#BC6C25" />
                </TouchableOpacity>
              )}
            </View>
            <Container>
              {params.bean.uri && (
                <ImagePreview source={{ uri: params.bean.uri }} />
              )}
              <Headline>{params.bean.productName}</Headline>
              <View style={detailStyles.container}>
                <View style={detailStyles.description}>
                  <View style={detailStyles.iconWrapper}>
                    <MaterialCommunityIcons
                      name="storefront"
                      size={44}
                      color="#BC6C25"
                    />
                  </View>

                  <Text style={detailStyles.text}>
                    {params.bean.roaster}, {params.bean.roasterCountry}
                  </Text>
                </View>
                <View style={detailStyles.description}>
                  <View style={detailStyles.iconWrapper}>
                    <Fontisto name="coffeescript" size={32} color="#BC6C25" />
                  </View>
                  <Text style={detailStyles.text}>{params.bean.beanType}</Text>
                </View>
              </View>
            </Container>
            <Container>
              <Headline>Flavour profile:</Headline>
              <RatingElement
                startingValue={flavourProfile.body}
                ratingImage={ratingImage}
                readonly
                onFinishRating={() => {}}
                label="Body"
              />
              <RatingElement
                startingValue={flavourProfile.acidity}
                ratingImage={ratingImage}
                readonly
                onFinishRating={() => {}}
                label="Acidity"
              />
              <RatingElement
                startingValue={flavourProfile.fruit}
                ratingImage={ratingImage}
                readonly
                onFinishRating={() => {}}
                label="Fruit"
              />
            </Container>
            {isFavourite &&
              (isReviewed === false ? (
                <>
                  <Separator />
                  <Container>
                    <Headline>Rate these beans...</Headline>
                    <Rating
                      startingValue={0}
                      onFinishRating={ratingStateHandler}
                    />
                  </Container>
                  <Container>
                    <Headline>... and let us know your thoughts:</Headline>
                    <Input
                      value={review}
                      onChangeText={(text) => setReview(text)}
                      placeholder="Hmmm... beautiful coffeeeee"
                      multiline
                    />
                    <Spacer />
                    <Button label="save review" onPress={saveReviewHandler} />
                  </Container>
                </>
              ) : (
                <>
                  <Separator />
                  <Container>
                    <Headline>Your rating</Headline>
                    <Rating
                      startingValue={rating}
                      onFinishRating={ratingStateHandler}
                    />
                  </Container>
                  <Container>
                    <Headline>Your review:</Headline>
                    <Input
                      value={review}
                      onChangeText={(text) => setReview(text)}
                      placeholder={review}
                      multiline
                      clearButtonMode="while-editing"
                    />
                    <Spacer />
                    <Button
                      label="update review"
                      onPress={updateReviewHandler}
                    />
                  </Container>
                </>
              ))}
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      <Footer />
    </Screen>
  );
}
