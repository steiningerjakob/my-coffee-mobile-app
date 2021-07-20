import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Loading(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator color="#000" animating={true} size="small" />
      <Text
        style={{
          alignContent: 'center',
          fontSize: 14,
          marginTop: 12,
          color: 'lightgrey',
        }}
      >
        {props.label}
      </Text>
    </View>
  );
}
