import React from 'react';
import { StyleSheet, Text } from 'react-native';

const textStyles = StyleSheet.create({
  headline: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 12,
    fontWeight: '500',
  },
  paragraph: {
    color: 'black',
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    color: 'black',
    fontSize: 16,
    textAlign: 'left',
  },
});

export function Headline(props) {
  return <Text style={textStyles.headline}>{props.children}</Text>;
}

export function Paragraph(props) {
  return <Text style={textStyles.paragraph}>{props.children}</Text>;
}

export function Label(props) {
  return <Text style={textStyles.label}>{props.children}</Text>;
}
