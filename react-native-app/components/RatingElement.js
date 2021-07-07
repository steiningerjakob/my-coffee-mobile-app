import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Label } from './Text';

const ratingStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
});

export default function RatingElement(props) {
  return (
    <View style={ratingStyles.wrapper}>
      <Label>{props.label}</Label>
      <Rating
        startingValue={props.startingValue}
        imageSize={24}
        type="custom"
        ratingImage={props.ratingImage}
        ratingColor="#F9DFC2"
        tintColor="#BC6C25"
        readonly={props.readonly}
        onFinishRating={props.onFinishRating() | ''}
      />
    </View>
  );
}
