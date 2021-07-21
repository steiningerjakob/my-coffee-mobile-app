import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';
import { TouchableOpacity } from 'react-native-gesture-handler';

const footerStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#BC6C25',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapperLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  wrapperRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  scanner: {
    borderRadius: 100,
    backgroundColor: 'white',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    overflow: 'visible',
  },
  element: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 32,
  },
  label: {
    fontSize: 8,
    color: 'white',
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});

export default function Footer(props) {
  const navigation = useNavigation();

  const tooltipFav = useRef(null);
  const tooltipBrowse = useRef(null);
  const tooltipScan = useRef(null);
  const tooltipMap = useRef(null);
  const tooltipPro = useRef(null);

  const tooltipText = 'You need to be logged in to perform this action';

  return (
    <SafeAreaView style={footerStyles.safeAreaView}>
      <View style={footerStyles.container}>
        <View style={footerStyles.wrapperLeft}>
          <View style={footerStyles.element}>
            <Tooltip
              popover={<Text style={{ color: 'white' }}>{tooltipText}</Text>}
              ref={tooltipFav}
              backgroundColor="#5C5552"
              width={180}
              height={56}
              withOverlay={false}
            >
              <AntDesign
                name="staro"
                size={32}
                color="white"
                style={footerStyles.icon}
                onPress={
                  props.firstName
                    ? () => navigation.navigate('Favourites')
                    : () => tooltipFav.current.toggleTooltip()
                }
              />
            </Tooltip>
            <Text style={footerStyles.label}>Favourites</Text>
          </View>
          <View style={footerStyles.element}>
            <Tooltip
              popover={<Text style={{ color: 'white' }}>{tooltipText}</Text>}
              ref={tooltipBrowse}
              backgroundColor="#5C5552"
              width={180}
              height={56}
              withOverlay={false}
            >
              <AntDesign
                name="search1"
                size={32}
                color="white"
                style={footerStyles.icon}
                onPress={
                  props.firstName
                    ? () => navigation.navigate('Browse')
                    : () => tooltipBrowse.current.toggleTooltip()
                }
              />
            </Tooltip>
            <Text style={footerStyles.label}>Browse</Text>
          </View>
        </View>
        <View style={footerStyles.scanner}>
          <Tooltip
            popover={<Text style={{ color: 'white' }}>{tooltipText}</Text>}
            ref={tooltipScan}
            backgroundColor="#5C5552"
            width={180}
            height={56}
            withOverlay={false}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={32}
              color="#BC6C25"
              onPress={
                props.firstName
                  ? () => navigation.navigate('Scanner')
                  : () => tooltipScan.current.toggleTooltip()
              }
            />
          </Tooltip>
        </View>
        <View style={footerStyles.wrapperRight}>
          <View style={footerStyles.element}>
            <Tooltip
              popover={<Text style={{ color: 'white' }}>{tooltipText}</Text>}
              ref={tooltipMap}
              backgroundColor="#5C5552"
              width={180}
              height={56}
              withOverlay={false}
            >
              <Ionicons
                name="ios-map-outline"
                size={32}
                color="white"
                onPress={
                  props.firstName
                    ? () => navigation.navigate('Map')
                    : () => tooltipMap.current.toggleTooltip()
                }
                style={footerStyles.icon}
              />
            </Tooltip>
            <Text style={footerStyles.label}>Find store</Text>
          </View>
          <View style={footerStyles.element}>
            <Tooltip
              popover={<Text style={{ color: 'white' }}>{tooltipText}</Text>}
              ref={tooltipPro}
              backgroundColor="#5C5552"
              width={180}
              height={56}
              withOverlay={false}
            >
              <AntDesign
                name="user"
                size={32}
                color="white"
                onPress={
                  props.firstName
                    ? () => navigation.navigate('Profile')
                    : () => tooltipPro.current.toggleTooltip()
                }
                style={footerStyles.icon}
              />
            </Tooltip>
            <Text style={footerStyles.label}>Profile</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
