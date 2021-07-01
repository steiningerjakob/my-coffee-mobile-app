import React from 'react';
import { StyleSheet, Text } from 'react-native';

const textStyles = StyleSheet.create({
  headline: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  paragraph: {
    color: 'black',
    fontSize: 16,
    marginBottom: 4,
  },
});

export function Headline(props) {
  return <Text style={textStyles.headline}>{props.children}</Text>;
}

export function Paragraph(props) {
  return <Text style={textStyles.paragraph}>{props.children}</Text>;
}
