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
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#BC6C25',
    borderRadius: 24,
    padding: 16,
    width: '80%',
  },
  wrapperDisabled: {
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
        props.disabled ? buttonStyles.wrapperDisabled : buttonStyles.wrapper
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
