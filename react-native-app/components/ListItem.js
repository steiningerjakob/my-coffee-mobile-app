import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ratingImage from '../assets/custom_bean.png';
import RatingElement from './RatingElement';

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
  icon: { marginLeft: 'auto' },
});

export default function ListItem(props) {
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
          <Text style={listItemStyles.title}>{props.item.productName}</Text>
          <Text style={listItemStyles.subTitle}>{props.item.beanType}</Text>
          <Text style={listItemStyles.subTitle}>{props.item.roaster}</Text>
          {props.item.rating && (
            <RatingElement
              startingValue={props.item.rating}
              ratingImage={ratingImage}
              readonly
              onFinishRating={() => {}}
              label=""
            />
          )}
          {props.item.review && (
            <Text style={listItemStyles.review}>{props.item.review}</Text>
          )}
          {props.item.body && (
            <>
              <RatingElement
                startingValue={props.item.body}
                ratingImage={ratingImage}
                readonly
                onFinishRating={() => {}}
                label="Body"
              />
              <RatingElement
                startingValue={props.item.acidity}
                ratingImage={ratingImage}
                readonly
                onFinishRating={() => {}}
                label="Acidity"
              />
              <RatingElement
                startingValue={props.item.fruit}
                ratingImage={ratingImage}
                readonly
                onFinishRating={() => {}}
                label="Fruit"
              />
            </>
          )}
        </View>
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
