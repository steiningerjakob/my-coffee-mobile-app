import React from 'react';
import { StyleSheet, View } from 'react-native';

const spacerStyles = StyleSheet.create({ spacer: { height: 12, width: 32 } });

export default function Spacer() {
  return <View style={spacerStyles.spacer} />;
}
