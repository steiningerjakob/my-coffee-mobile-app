import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { userContext } from '../App';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import Spacer from '../components/Spacer';
import { Paragraph } from '../components/Text';
import { getBeans } from '../util/apiFunctions';

export default function Scanner() {
  const navigation = useNavigation();
  const { firstName, refreshUserContext } = useContext(userContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [beans, setBeans] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      getBeans().then((data) => {
        if (data) {
          setBeans(data.beans);
        }
      });
    })();
  }, []);

  function navigationHandler(bean) {
    Alert.alert(
      'Success!',
      'We have found your favourite coffee! Do you want to proceed to the selected coffee beans?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Detail', { bean });
          },
        },
      ],
    );
  }

  function findBeansByBarCode(barCodeInput) {
    const selectedBean = beans.find(
      (bean) => bean.barcodeEan13 === barCodeInput,
    );
    if (selectedBean) {
      // alert(`Voilà, found your coffee!`);
      navigationHandler(selectedBean);
    } else {
      alert(
        'No matching beans found, please try another barcode or browse our selection.',
      );
    }
  }

  function handleBarCodeScanned({ data }) {
    setScanned(true);
    findBeansByBarCode(data);
  }
  // eslint-disable-next-line
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  // eslint-disable-next-line
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Screen>
      <Header
        label="Barcode scanner"
        firstName={firstName}
        refreshUserContext={refreshUserContext}
      />
      <Spacer />
      <Container>
        <Paragraph>Scan the barcode of your favourite coffee:</Paragraph>
      </Container>
      <Spacer />
      <Container fill>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        />
      </Container>
      {scanned && (
        <Container>
          <Spacer />
          <Button label="Tap to scan again" onPress={() => setScanned(false)} />
          <Spacer />
        </Container>
      )}
      <Footer firstName={firstName} />
    </Screen>
  );
}
