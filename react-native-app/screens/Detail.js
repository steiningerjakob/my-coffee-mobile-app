import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { userContext } from '../App';
import { beanImages } from '../assets/beans/beansImages';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImagePreview from '../components/ImagePreview';
import Screen from '../components/Screen';
import { Headline, Paragraph } from '../components/Text';

export default function Detail(props) {
  const { firstName, id, refreshUserContext } = useContext(userContext);
  const { params } = props.route;
  const [flavourProfile, setFlavourProfile] = useState({});
  const [isFavourite, setFavourite] = useState();

  async function getFlavourProfile() {
    const { manifest } = Constants;

    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `jakobs-mobile-coffee-app.herokuapp.com`;

    const apiBaseUrl =
      apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
        ? `https:${apiBaseUrlDraft}`
        : `http:${apiBaseUrlDraft}`;

    const response = await fetch(`${apiBaseUrl}/products/flavour`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: params.bean.flavourProfile,
      }),
    });

    const flavour = await response.json();
    return flavour;
  }

  async function checkFavouriteStatus() {
    const { manifest } = Constants;

    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `jakobs-mobile-coffee-app.herokuapp.com`;

    const apiBaseUrl =
      apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
        ? `https:${apiBaseUrlDraft}`
        : `http:${apiBaseUrlDraft}`;

    const response = await fetch(`${apiBaseUrl}/actions/favourite_status`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        beanId: params.bean.id,
      }),
    });

    const data = await response.json();
    if (data.favourite) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    getFlavourProfile().then((data) => {
      if (data) setFlavourProfile(data.flavour);
    });
    checkFavouriteStatus().then((favourite) => {
      if (favourite) {
        setFavourite(true);
      } else {
        setFavourite(false);
      }
    });
  }, []);

  async function addBeansToFavourites() {
    const { manifest } = Constants;

    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `jakobs-mobile-coffee-app.herokuapp.com`;

    const apiBaseUrl =
      apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
        ? `https:${apiBaseUrlDraft}`
        : `http:${apiBaseUrlDraft}`;

    const response = await fetch(`${apiBaseUrl}/actions/add_favourite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        beanId: params.bean.id,
      }),
    });

    const data = await response.json();
    if (data.message) {
      alert(data.message);
    } else {
      alert('Oops.. something went wrong');
    }
    setFavourite(true);
  }

  async function removeBeansFromFavourites() {
    const { manifest } = Constants;

    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `jakobs-mobile-coffee-app.herokuapp.com`;

    const apiBaseUrl =
      apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
        ? `https:${apiBaseUrlDraft}`
        : `http:${apiBaseUrlDraft}`;

    const response = await fetch(`${apiBaseUrl}/actions/remove_favourite`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        beanId: params.bean.id,
      }),
    });

    const data = await response.json();
    if (data.message) {
      alert(data.message);
    } else {
      alert('Oops.. something went wrong');
    }
    setFavourite(false);
  }

  return (
    <Screen>
      <Header
        label={params.bean.productName}
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <ScrollView style={{ flex: 1 }}>
        <Container>
          {isFavourite ? (
            <TouchableOpacity onPress={removeBeansFromFavourites}>
              <AntDesign name="star" size={32} color="#BC6C25" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={addBeansToFavourites}>
              <AntDesign name="staro" size={32} color="#BC6C25" />
            </TouchableOpacity>
          )}
        </Container>
        <Container>
          {params.bean.img && (
            <ImagePreview source={beanImages[`image${params.bean.id}`]} />
          )}
        </Container>
        <Container>
          <Headline>{params.bean.productName}</Headline>
          <Paragraph>
            Roaster: {params.bean.roaster}, {params.bean.roasterCountry}
          </Paragraph>
          <Paragraph>Bean type: {params.bean.beanType}</Paragraph>
          <Paragraph>
            Price: {(params.bean.price / params.bean.kg).toFixed(2)} €/kg
          </Paragraph>
        </Container>
        <Container>
          <Headline>Flavour profile:</Headline>
          <Paragraph>Body: {flavourProfile.body}/5</Paragraph>
          <Paragraph>Acidity: {flavourProfile.acidity}/5</Paragraph>
          <Paragraph>Fruit: {flavourProfile.fruit}/5</Paragraph>
        </Container>
      </ScrollView>
      <Footer />
    </Screen>
  );
}
