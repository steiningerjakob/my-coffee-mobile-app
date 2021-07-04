// TODO: fix functions so that image gets stored
// currently storing empty array []

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@my-coffee-mobile-app/images';

export const storeData = async (value) => {
  console.log('storeData is running with value', value);
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('Storage Key', STORAGE_KEY);
    console.log('json in async', json);
    if (json === null) return null;
    return JSON.parse(json);
  } catch (error) {
    console.log(error);
  }
};

export const addData = async (value) => {
  console.log('addData is running with value', value);
  let data = [];
  const existing = await getData();
  console.log('existing', existing);
  if (existing) {
    data = [...existing];
    console.log('data variable in addData', data);
    data.push(value);
  } else {
    await storeData(value);
  }
};
