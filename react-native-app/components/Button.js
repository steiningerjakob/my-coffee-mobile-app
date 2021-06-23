import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const buttonStyles = StyleSheet.create({
  label: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  wrapperMain: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#BC6C25',
    borderRadius: 24,
    padding: 16,
    width: '80%',
  },
  wrapperVariant: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#DDA15E',
    borderRadius: 24,
    padding: 16,
    width: '80%',
  },
});

export default function Button(props) {
  return (
    <TouchableOpacity
      style={
        props.variant ? buttonStyles.wrapperVariant : buttonStyles.wrapperMain
      }
      disabled={props.disabled}
      onPress={() => {
        props.onPress();
      }}
    >
      <Text style={buttonStyles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
}
