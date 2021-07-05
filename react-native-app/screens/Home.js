import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import { getBeans, getFilteredBeans } from '../util/apiFunctions';

const searchFieldStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#BC6C25',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: 320,
  },
  inputField: {
    width: 240,
    marginLeft: 16,
  },
});

export default function Home() {
  const navigation = useNavigation();
  const { firstName, refreshUserContext } = useContext(userContext);
  const [beans, setBeans] = useState([]);
  const [query, setQuery] = useState();
  console.log('query', query);

  useFocusEffect(
    useCallback(() => {
      if (!query) {
        getBeans().then((data) => {
          console.log('getBeans is running');
          if (data) setBeans(data.beans);
        });
      } else {
        getFilteredBeans(query).then((data) => {
          console.log('getFilteredBeans is running');
          if (data) setBeans(data.filteredBeans);
        });
      }
    }, [query]),
  );

  return (
    <Screen>
      <Header
        label="Home"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Container>
        <View style={searchFieldStyles.wrapper}>
          <AntDesign name="search1" size={32} color="#BC6C25" />
          <TextInput
            placeholder="Browse our world of coffee..."
            value={query}
            onChangeText={(text) => setQuery(text)}
            clearButtonMode="while-editing"
            style={searchFieldStyles.inputField}
          />
        </View>
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
