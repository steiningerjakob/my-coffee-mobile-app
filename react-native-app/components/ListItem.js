import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { beanImages } from '../assets/beans/beansImages';

const listItemStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: 320,
  },
  image: {
    marginRight: 12,
    height: 48,
    width: 48,
  },
  title: { fontSize: 16, color: 'black', textAlign: 'left' },
  icon: { marginLeft: 'auto' },
});

export default function ListItem(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={listItemStyles.wrapper}>
        {props.item && (
          <Image
            resizeMode="contain"
            source={beanImages[`image${props.item.id}`]}
            style={listItemStyles.image}
          />
        )}
        <Text style={listItemStyles.title}>{props.item.productName}</Text>
        <AntDesign
          name="right"
          size={24}
          color="black"
          style={listItemStyles.icon}
        />
      </View>
    </TouchableOpacity>
  );
}
