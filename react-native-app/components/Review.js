import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import Container from './Container';

const reviewStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    width: 320,
    marginBottom: 4,
  },
  image: {
    marginHorizontal: 16,
    height: 64,
    width: 64,
    borderRadius: 100,
  },
  paragraph: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
  },
  subTitle: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'left',
    marginBottom: 4,
  },
  rating: {
    alignSelf: 'flex-start',
  },
  review: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'left',
    marginTop: 4,
    fontStyle: 'italic',
    flexShrink: 1,
  },
  icon: { marginLeft: 'auto' },
});

export default function Review(props) {
  console.log('props', props);
  return (
    <View style={reviewStyles.wrapper}>
      {props.item && (
        <Image
          resizeMode="contain"
          source={{ uri: props.item.uri }}
          style={reviewStyles.image}
        />
      )}
      <View style={reviewStyles.paragraph}>
        <Text numberOfLines={1} style={reviewStyles.subTitle}>
          {props.item.firstName} {props.item.lastName}, {props.item.ratingDate}
        </Text>
        <Rating
          startingValue={props.item.userRating}
          readonly
          imageSize={16}
          style={reviewStyles.rating}
        />
        <Text style={reviewStyles.review}>{props.item.userReview}</Text>
      </View>
    </View>
  );
}
