import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';

const listItemStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: 320,
  },
  image: {
    marginRight: 8,
    height: 64,
    width: 64,
  },
  paragraph: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: { fontSize: 16, color: 'black', textAlign: 'left' },
  subTitle: { fontSize: 14, color: 'grey', textAlign: 'left', marginTop: 4 },
  review: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'left',
    marginTop: 4,
    fontStyle: 'italic',
  },
  reviewCount: {
    color: 'grey',
    marginLeft: 12,
    fontStyle: 'italic',
  },
  icon: { marginLeft: 'auto' },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default function ListItemFav(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()} disabled={props.disabled}>
      <View style={listItemStyles.wrapper}>
        {props.item && (
          <Image
            resizeMode="contain"
            source={{ uri: props.item.uri }}
            style={listItemStyles.image}
          />
        )}
        <View style={listItemStyles.paragraph}>
          <Text numberOfLines={1} style={listItemStyles.title}>
            {props.item.productName}
          </Text>
          <Text numberOfLines={1} style={listItemStyles.subTitle}>
            {props.item.beanType}
          </Text>
          <Text numberOfLines={1} style={listItemStyles.subTitle}>
            {props.item.roaster}
          </Text>
          <View style={listItemStyles.rating}>
            <Rating startingValue={props.item.rating} readonly imageSize={24} />
            {props.item.reviewCount && (
              <Text style={listItemStyles.reviewCount}>
                ({props.item.reviewCount})
              </Text>
            )}
          </View>
          {props.item.review && (
            <Text style={listItemStyles.review}>{props.item.review}</Text>
          )}
        </View>
        <AntDesign
          name="right"
          size={24}
          color="grey"
          style={listItemStyles.icon}
        />
      </View>
    </TouchableOpacity>
  );
}
