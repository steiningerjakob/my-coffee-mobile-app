import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { userContext } from '../App';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';
import Screen from '../components/Screen';
import { getFilteredBeans, getRatedBeans } from '../util/apiFunctions';

const productListStyles = StyleSheet.create({
  searchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#BC6C25',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
    width: 320,
  },
  inputField: {
    width: 240,
    marginLeft: 16,
  },
  sortWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: '100%',
  },
  sortButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#BC6C25',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 90,
  },
  sortButtonActive: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#BC6C25',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 90,
    backgroundColor: '#F3EEEE',
  },
  sortLabel: {
    color: '#BC6C25',
    fontSize: 12,
  },
});

export default function Browse() {
  const navigation = useNavigation();
  const { firstName, refreshUserContext } = useContext(userContext);
  const [beans, setBeans] = useState([]);
  const [ratedBeans, setRatedBeans] = useState([]);
  console.log('rated beans', ratedBeans);
  const [query, setQuery] = useState();
  const [roasterFilter, setRoasterFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState(false);

  function roasterSorter(a, b) {
    const beanA = a.roaster;
    const beanB = b.roaster;
    if (beanA > beanB) {
      return 1;
    }
    if (beanA < beanB) {
      return -1;
    }
  }

  function typeSorter(a, b) {
    const beanA = a.beanType;
    const beanB = b.beanType;
    if (beanA > beanB) {
      return 1;
    }
    if (beanA < beanB) {
      return -1;
    }
  }

  useFocusEffect(
    useCallback(() => {
      getFilteredBeans(query).then((data) => {
        if (data) {
          const unsortedBeans = data.filteredBeans;
          if (roasterFilter) {
            const sortedBeans = unsortedBeans.sort(roasterSorter);
            setBeans(sortedBeans);
          }
          if (typeFilter) {
            const sortedBeans = unsortedBeans.sort(typeSorter);
            setBeans(sortedBeans);
          } else {
            setBeans(unsortedBeans);
          }
        }
      });
      getRatedBeans().then((data) => {
        if (data) {
          setRatedBeans(data.ratedBeans);
        }
      });
    }, [query, roasterFilter, typeFilter]),
  );

  // WORK IN PROGRESS
  const beansWithoutRating = beans.filter(
    (all) => !ratedBeans.find((rated) => all.id === rated.beanId),
  );
  // console.log('beans without rating', beansWithoutRating);

  function removeDuplicates(array) {
    const resultArray = [];
    for (let i = 1; i < array.length; i++) {
      const groupedBeans = ratedBeans.filter((bean) => bean.beanId === i);
      console.log('grouped bean', groupedBeans);

      if (groupedBeans.length === 0) {
        resultArray.push(groupedBeans);
      } else {
        const groupedBeanRatings = groupedBeans.map((bean) =>
          Number(bean.rating),
        );
        console.log('grouped bean ratings', groupedBeanRatings);
        const ratingSum = groupedBeanRatings.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
        );
        const ratingAverage = ratingSum / groupedBeanRatings.length;
        const groupedBeanReviews = groupedBeans.map((bean) => bean.review);

        const collapsedBean = {
          id: i,
          rating: ratingAverage,
          reviews: groupedBeanReviews,
        };
        console.log('collapsed bean', collapsedBean);
        resultArray.push(collapsedBean);
        console.log('result array', resultArray);
        return resultArray;
      }
    }
  }

  const result = removeDuplicates(ratedBeans);
  console.log('result of the function', result);

  // WORK IN PROGRESS

  return (
    <Screen>
      <Header
        label="Browse"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      {!beans.length ? (
        <Loading />
      ) : (
        <>
          <Container>
            <View style={productListStyles.searchWrapper}>
              <AntDesign name="search1" size={32} color="#BC6C25" />
              <TextInput
                placeholder="Browse our world of coffee..."
                value={query}
                onChangeText={(text) => setQuery(text)}
                clearButtonMode="while-editing"
                style={productListStyles.inputField}
              />
            </View>
            <View style={productListStyles.sortWrapper}>
              <TouchableOpacity
                style={
                  roasterFilter | typeFilter
                    ? productListStyles.sortButton
                    : productListStyles.sortButtonActive
                }
                onPress={() => {
                  setRoasterFilter(false);
                  setTypeFilter(false);
                }}
              >
                <Text style={productListStyles.sortLabel}>Name</Text>
                <FontAwesome name="sort" size={16} color="#BC6C25" />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  typeFilter
                    ? productListStyles.sortButtonActive
                    : productListStyles.sortButton
                }
                onPress={() => {
                  setTypeFilter(!typeFilter);
                  setRoasterFilter(false);
                }}
              >
                <Text style={productListStyles.sortLabel}>Bean type</Text>
                <FontAwesome name="sort" size={16} color="#BC6C25" />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  roasterFilter
                    ? productListStyles.sortButtonActive
                    : productListStyles.sortButton
                }
                onPress={() => {
                  setRoasterFilter(!roasterFilter);
                  setTypeFilter(false);
                }}
              >
                <Text style={productListStyles.sortLabel}>Roaster</Text>
                <FontAwesome name="sort" size={16} color="#BC6C25" />
              </TouchableOpacity>
            </View>
          </Container>
          <Container fill>
            {beans.length > 0 && (
              <FlatList
                data={beans}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <ListItem
                    item={item}
                    onPress={() =>
                      navigation.navigate('Detail', { bean: item })
                    }
                  />
                )}
              />
            )}
          </Container>
        </>
      )}
      <Footer />
    </Screen>
  );
}
