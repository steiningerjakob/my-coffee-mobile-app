import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import { Headline } from '../components/Text';
import { getBeans } from '../util/apiFunctions';

export default function Home() {
  const navigation = useNavigation();
  const { firstName, refreshUserContext } = useContext(userContext);
  const [beans, setBeans] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getBeans().then((data) => {
        if (data) setBeans(data.beans);
      });
    }, []),
  );

  return (
    <Screen>
      <Header
        label="Home"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Container>
        <Headline>Browse our world of coffee, {firstName}!</Headline>
      </Container>
      <Container fill>
        {beans.length > 0 && (
          <ScrollView style={{ flex: 1 }}>
            <Container>
              {beans.map((bean) => (
                <ListItem
                  key={bean.id}
                  item={bean}
                  onPress={() => navigation.navigate('Detail', { bean })}
                />
              ))}
            </Container>
          </ScrollView>
        )}
      </Container>
      <Footer />
    </Screen>
  );
}
