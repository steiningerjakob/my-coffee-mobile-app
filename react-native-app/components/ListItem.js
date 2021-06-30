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
    width: 320,
  },
  image: {
    marginRight: 12,
    height: 48,
    width: 48,
  },
  title: { fontSize: 16, color: 'black', textAlign: 'left' },
});

export default function ListItem(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={listItemStyles.wrapper}>
        {props.item && (
          <Image
            resizeMode="cover"
            source={props.item.img}
            style={listItemStyles.image}
          />
        )}
        <Text style={listItemStyles.title}>{props.item.productName}</Text>
      </View>
    </TouchableOpacity>
  );
}
