import React from 'react';
import { Image, StyleSheet } from 'react-native';

const imageStyles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});

export default function ImagePreview(props) {
  return <Image style={imageStyles.image} source={props.source} />;
}
