import React from 'react';
import { StyleSheet, View } from 'react-native';

const screenStyles = StyleSheet.create({
  screen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  screenFill: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default function Container(props) {
  return (
    <View style={props.fill ? screenStyles.screenFill : screenStyles.screen}>
      {props.children}
    </View>
  );
}
