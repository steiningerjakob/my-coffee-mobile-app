import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const inputStyles = StyleSheet.create({
  field: {
    borderColor: '#BC6C25',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: 240,
  },
});

export default function Input(props) {
  return (
    <TextInput
      placeholder={props.placeholder}
      onChangeText={(text) => props.onChangeText(text)}
      value={props.value}
      type={props.type}
      clearButtonMode={props.clearButtonMode}
      style={inputStyles.field}
      secureTextEntry={props.secureTextEntry}
      multiline={props.multiline}
      editable={props.editable}
    />
  );
}
