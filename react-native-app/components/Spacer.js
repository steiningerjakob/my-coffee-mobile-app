import React from 'react';
import { StyleSheet, View } from 'react-native';

const spacerStyles = StyleSheet.create({
  spacer: { height: 12, width: 32 },
  largeSpacer: { height: 48, width: 32 },
});

export default function Spacer(props) {
  return (
    <View
      style={props.large ? spacerStyles.largeSpacer : spacerStyles.spacer}
    />
  );
}
