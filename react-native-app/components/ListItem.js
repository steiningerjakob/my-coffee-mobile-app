import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const listItemStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  image: {
    marginRight: 12,
    height: 48,
    width: 48,
  },
  title: { fontSize: 24, color: 'black', textAlign: 'left' },
});

export default function ListItem(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={listItemStyles.wrapper}>
        <Image
          resizeMode="cover"
          source={{
            uri: props.item.image,
          }}
          style={listItemStyles.image}
        />
        <Text style={listItemStyles.title}>{props.item.title}</Text>
      </View>
    </TouchableOpacity>
  );
}
