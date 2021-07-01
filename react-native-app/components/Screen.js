import React from 'react';
import { StyleSheet, View } from 'react-native';

const screenStyles = StyleSheet.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
});

export default function Screen(props) {
  return <View style={screenStyles.screen}>{props.children}</View>;
}
