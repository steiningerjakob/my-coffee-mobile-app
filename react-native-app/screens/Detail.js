import {
  AntDesign,
  Entypo,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Tooltip } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { userContext } from '../App';
import ratingImage from '../assets/custom_bean.png';
import Container from '../components/Container';
import FloatingButton from '../components/FloatingButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImagePreview from '../components/ImagePreview';
import Input from '../components/Input';
import Loading from '../components/Loading';
import RatingElement from '../components/RatingElement';
import Review from '../components/Review';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline, Paragraph } from '../components/Text';
import {
  addBeansToFavourites,
  checkFavouriteStatus,
  checkReviewStatus,
  deleteReview,
  getFlavourProfile,
  getUserReviews,
  insertReview,
  removeBeansFromFavourites,
  updateReview,
} from '../util/apiFunctions';

const detailStyles = StyleSheet.create({
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
  ratingHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  icon: {
    marginLeft: 'auto',
  },
  deleteButton: {
    color: '#BC6C25',
    fontSize: 16,
    fontWeight: '500',
  },
  cancel: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
});

export default function Detail(props) {
  const { params } = props.route;
  const { firstName, id, refreshUserContext } = useContext(userContext);

  const [isLoading, setLoading] = useState(true);
  const [isFavourite, setFavourite] = useState(false);
  const [isReviewed, setReviewed] = useState(false);
  const [userReviewsVisible, setUserReviewsVisible] = useState(false);
  const [modalIsVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(false);

  const [flavourProfile, setFlavourProfile] = useState({});
  const [rating, setRating] = useState();
  const [review, setReview] = useState('');
  const [userReviews, setUserReviews] = useState([]);

  const addTooltip = useRef(null);
  const removeTooltip = useRef(null);

  function addButtonHandler() {
    addBeansToFavourites(firstName, id, params.bean.id);
    setFavourite(true);
    removeTooltip.current.toggleTooltip();
  }

  function removeButtonHandler() {
    removeBeansFromFavourites(id, params.bean.id);
    setFavourite(false);
    addTooltip.current.toggleTooltip();
  }

  function ratingStateHandler(userInput) {
    const inputForState = userInput;
    setRating(inputForState);
  }

  function saveReviewHandler() {
    insertReview(id, params.bean.id, rating, review);
    setReviewed(true);
    setModalVisible(false);
  }

  async function updateReviewHandler() {
    updateReview(id, params.bean.id, rating, review);
    setReviewed(true);
    setModalVisible(false);
  }

  function deleteReviewHandler() {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete your review?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteReview(id, params.bean.id);
            setReviewed(false);
            removeButtonHandler();
            setRating('');
            setReview('');
          },
        },
      ],
    );
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
    getUserReviews(params.bean.id).then((data) => {
      if (data) {
        setUserReviews(data.userReviews);
      }
    });
    setLoading(false);
    // eslint-disable-next-line
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
        <>
          {/* eslint-disable-next-line */}
          {isFavourite && !isReviewed && (
            <FloatingButton
              label="add review"
              onPress={() => setModalVisible(true)}
            />
          )}
          {/* eslint-disable-next-line */}
          {isFavourite && isReviewed && (
            <FloatingButton
              label="view review"
              onPress={() => setModalVisible(true)}
            />
          )}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={detailStyles.cancel}>
              {/* eslint-disable-next-line */}
              {isFavourite ? (
                <Tooltip
                  popover={<Text>Added to your list</Text>}
                  ref={addTooltip}
                  backgroundColor="#DDA15E"
                  withOverlay={false}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={40}
                    color="#BC6C25"
                    onPress={removeButtonHandler}
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  popover={<Text>Removed from your list</Text>}
                  ref={removeTooltip}
                  backgroundColor="#DDA15E"
                  width={180}
                  withOverlay={false}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={40}
                    color="#BC6C25"
                    onPress={addButtonHandler}
                  />
                </Tooltip>
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
                startingValue={flavourProfile.intensity}
                ratingImage={ratingImage}
                readonly
                onFinishRating={() => {}}
                label="Intensity"
              />
            </Container>
            <Container>
              <TouchableOpacity
                style={detailStyles.ratingHeading}
                onPress={() => {
                  setUserReviewsVisible(!userReviewsVisible);
                }}
              >
                <Headline>What our users think...</Headline>
                <AntDesign
                  name="down"
                  size={24}
                  color="black"
                  style={detailStyles.icon}
                />
              </TouchableOpacity>
              {userReviewsVisible &&
                (userReviews.length === 0 ? (
                  <>
                    <Paragraph>No reviews yet...</Paragraph>
                    <Spacer />
                  </>
                ) : (
                  userReviews.map((userReview) => (
                    <Review key={userReview.uri} item={userReview} />
                  ))
                ))}
            </Container>
            {modalIsVisible && !isReviewed && (
              <Container fill>
                <Modal
                  visible={modalIsVisible}
                  animationType="slide"
                  presentationStyle="pageSheet"
                >
                  <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                  >
                    <KeyboardAvoidingView
                      behavior="padding"
                      style={{ flex: 1, alignItems: 'center' }}
                    >
                      <View style={detailStyles.cancel}>
                        <Entypo
                          name="cross"
                          size={36}
                          color="#BC6C25"
                          onPress={() => setModalVisible(false)}
                        />
                      </View>
                      <Spacer large />
                      <Container>
                        <Headline>Rate these beans...</Headline>
                        <Spacer />
                        <Rating
                          startingValue={0}
                          onFinishRating={ratingStateHandler}
                        />
                      </Container>
                      <Spacer />
                      <Container>
                        <Headline>... and let us know your thoughts:</Headline>
                        <Spacer />
                        <Input
                          value={review}
                          onChangeText={(text) => setReview(text)}
                          placeholder="Hmmm... beautiful coffeeeee"
                          multiline
                        />
                      </Container>
                    </KeyboardAvoidingView>
                  </ScrollView>
                  {editing ? (
                    <FloatingButton
                      label="update review"
                      onPress={updateReviewHandler}
                      bottom
                    />
                  ) : (
                    <FloatingButton
                      label="save review"
                      onPress={saveReviewHandler}
                      bottom
                    />
                  )}
                </Modal>
              </Container>
            )}
            {modalIsVisible && isReviewed && (
              <Modal
                visible={modalIsVisible}
                animationType="slide"
                presentationStyle="pageSheet"
              >
                <View style={detailStyles.cancel}>
                  <Entypo
                    name="cross"
                    size={36}
                    color="#BC6C25"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Spacer large />
                <Container>
                  <Headline>Your rating</Headline>
                  <Rating
                    startingValue={rating}
                    onFinishRating={ratingStateHandler}
                    readonly
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
                    editable={false}
                  />
                </Container>
                <Spacer large />
                <Spacer large />
                <Container>
                  <FloatingButton
                    label="edit review"
                    onPress={() => {
                      setEditing(true);
                      setReviewed(false);
                      setModalVisible(true);
                      setReview('');
                    }}
                    bottom
                  />
                  <Spacer />
                  <TouchableOpacity onPress={deleteReviewHandler}>
                    <Text style={detailStyles.deleteButton}>Delete review</Text>
                  </TouchableOpacity>
                </Container>
              </Modal>
            )}
          </ScrollView>
        </>
      )}
      <Footer />
    </Screen>
  );
}
