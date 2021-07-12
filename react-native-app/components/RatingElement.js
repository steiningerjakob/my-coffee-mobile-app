import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { Label } from './Text';

const ratingStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '68%',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 8,
  },
  reviews: {
    color: '#ccc',
  },
});

export default function RatingElement(props) {
  return (
    <View style={ratingStyles.wrapper}>
      {props.label ? (
        <>
          <Label>{props.label}</Label>
          <Rating
            startingValue={props.startingValue}
            imageSize={24}
            type="custom"
            ratingImage={props.ratingImage}
            ratingColor="#F7D6B1"
            readonly={props.readonly}
            onFinishRating={props.onFinishRating() | ''}
          />
        </>
      ) : (
        <>
          <Rating
            startingValue={props.startingValue}
            imageSize={24}
            type="custom"
            ratingImage={props.ratingImage}
            ratingColor="#F7D6B1"
            readonly={props.readonly}
            onFinishRating={props.onFinishRating() | ''}
          />
          {props.reviews && (
            <Text style={ratingStyles.reviews}>({props.reviews})</Text>
          )}
        </>
      )}
    </View>
  );
}
