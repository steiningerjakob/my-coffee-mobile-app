import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { userContext } from '../App';
import { beanImages } from '../assets/beans/beansImages';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImagePreview from '../components/ImagePreview';
import Input from '../components/Input';
import Screen from '../components/Screen';
import Separator from '../components/Separator';
import Spacer from '../components/Spacer';
import { Headline, Paragraph } from '../components/Text';
import {
  addBeansToFavourites,
  checkFavouriteStatus,
  checkReviewStatus,
  getFlavourProfile,
  insertReview,
  removeBeansFromFavourites,
  updateReview,
} from '../util/apiFunctions';

const buttonStyles = StyleSheet.create({
  favourite: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
});

export default function Detail(props) {
  const { firstName, id, refreshUserContext } = useContext(userContext);
  const { params } = props.route;
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
  }, []);

  return (
    <Screen>
      <Header
        label={params.bean.productName}
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, alignItems: 'center' }}
      >
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={buttonStyles.favourite}>
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
            {params.bean.img && (
              <ImagePreview source={beanImages[`image${params.bean.id}`]} />
            )}
            <Headline>{params.bean.productName}</Headline>
            <Paragraph>
              Roaster: {params.bean.roaster}, {params.bean.roasterCountry}
            </Paragraph>
            <Paragraph>Bean type: {params.bean.beanType}</Paragraph>
          </Container>
          <Container>
            <Headline>Flavour profile:</Headline>
            <Paragraph>Body: {flavourProfile.body}/5</Paragraph>
            <Paragraph>Acidity: {flavourProfile.acidity}/5</Paragraph>
            <Paragraph>Fruit: {flavourProfile.fruit}/5</Paragraph>
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
                  <Button label="update review" onPress={updateReviewHandler} />
                </Container>
              </>
            ))}
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </Screen>
  );
}
