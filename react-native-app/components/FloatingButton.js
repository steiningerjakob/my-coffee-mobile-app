import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const buttonStyles = StyleSheet.create({
  label: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  wrapper: {
    position: 'absolute',
    top: 115,
    left: 20,
    elevation: 8,
    display: 'flex',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3.84,
    backgroundColor: '#BC6C25',
    borderRadius: 100,
    padding: 8,
    zIndex: 999,
  },
  wrapperBottom: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    elevation: 8,
    display: 'flex',
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 3.84,
    backgroundColor: '#BC6C25',
    borderRadius: 100,
    padding: 16,
    width: 240,
    zIndex: 999,
  },
});

export default function FloatingButton(props) {
  return (
    <TouchableOpacity
      style={props.bottom ? buttonStyles.wrapperBottom : buttonStyles.wrapper}
      disabled={props.disabled}
      onPress={() => {
        props.onPress();
      }}
    >
      {props.children}
      {props.label && <Text style={buttonStyles.label}>{props.label}</Text>}
    </TouchableOpacity>
  );
}
