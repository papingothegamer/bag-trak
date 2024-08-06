import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function TrackBagScreen() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setTrackingNumber(data);
    setShowScanner(false);
    Alert.alert('Barcode Scanned', `Tracking Number: ${data}`);
  };

  const handleTrackBag = () => {
    if (trackingNumber) {
      Alert.alert('Tracking Bag', `Tracking Number: ${trackingNumber}`);
    } else {
      Alert.alert('Error', 'Please enter or scan a tracking number');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Your Bag</Text>
      <TextInput
        placeholder="Tracking Number"
        value={trackingNumber}
        onChangeText={setTrackingNumber}
        style={styles.input}
      />
      <Button title="Scan Bag Tag Barcode" onPress={() => setShowScanner(true)} />
      <Button title="Track Bag" onPress={handleTrackBag} />
      
      {showScanner && (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.overlay}>
            <View style={styles.topOverlay} />
            <View style={styles.middleContainer}>
              <View style={styles.leftOverlay} />
              <View style={styles.viewfinder} />
              <View style={styles.rightOverlay} />
            </View>
            <View style={styles.bottomOverlay} />
          </View>
          {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  scannerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  middleContainer: {
    flexDirection: 'row',
  },
  leftOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  viewfinder: {
    width: qrSize,
    height: qrSize,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  rightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
