import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { userContext } from '../App';
import { beanImages } from '../assets/beans/beansImages';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ImagePreview from '../components/ImagePreview';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Headline, Paragraph } from '../components/Text';

export default function Detail(props) {
  const { firstName } = useContext(userContext);
  const { params } = props.route;

  return (
    <Screen>
      <Header label={params.bean.productName} firstName={firstName} />
      <Container fill>
        <ScrollView style={{ flex: 1 }}>
          <Container>
            {params.bean.img && (
              <ImagePreview source={beanImages[`image${params.bean.id}`]} />
            )}
            <Spacer />
            <Headline>{params.bean.productName}</Headline>
            <Paragraph>
              Roaster: {params.bean.roaster}, {params.bean.roasterCountry}
            </Paragraph>
            <Paragraph>Bean type: {params.bean.beanType}</Paragraph>
            <Paragraph>Seller: {params.bean.seller}</Paragraph>
            <Paragraph>
              Price: {params.bean.price / params.bean.kg} €/kg
            </Paragraph>
          </Container>
        </ScrollView>
      </Container>
      <Footer />
    </Screen>
  );
}
