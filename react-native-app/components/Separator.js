import React from 'react';
import { StyleSheet, View } from 'react-native';

const spacerStyles = StyleSheet.create({
  separator: {
    width: 320,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
});

export default function Separator() {
  return <View style={spacerStyles.separator} />;
}
