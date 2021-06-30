import React from 'react';
import { Image, StyleSheet } from 'react-native';

const imageStyles = StyleSheet.create({
  image: {
    width: 120,
    height: 240,
    resizeMode: 'contain',
  },
});

export default function ImagePreview(props) {
  return <Image style={imageStyles.image} source={props.source} />;
}
