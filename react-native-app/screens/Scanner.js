import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { userContext } from '../App';
import Button from '../components/Button';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Screen from '../components/Screen';
import { Headline } from '../components/Text';
import { getBeans } from '../util/apiFunctions';

const scannerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
  },
});

export default function Scanner() {
  const { firstName, refreshUserContext } = useContext(userContext);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barCode, setBarCode] = useState();
  const [beans, setBeans] = useState();

  console.log('barCode', barCode);
  console.log('type', typeof barCode);

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

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setBarCode(data);

    alert(`Voilà, found your coffee!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
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
      <Container>
        <Headline>Scan the barcode of your favourite coffee:</Headline>
      </Container>
      <Container fill>
        {/* <View style={scannerStyles.container}> */}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        />
        {scanned && (
          <Button label="Tap to scan again" onPress={() => setScanned(false)} />
        )}
        {/* </View> */}
      </Container>
      <Footer />
    </Screen>
  );
}
