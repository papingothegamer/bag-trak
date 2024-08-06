import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const generateTrackingCode = (airportCode) => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  return `BTRK-${randomNumber}-${airportCode}`;
};

export default function AddBagScreen({ navigation }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [location, setLocation] = useState('');
  const [flight, setFlight] = useState('');
  const [airportCode, setAirportCode] = useState('');
  const [generatedTrackingCode, setGeneratedTrackingCode] = useState('');
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

  const handleGenerateTrackingCode = () => {
    if (airportCode) {
      const code = generateTrackingCode(airportCode);
      setGeneratedTrackingCode(code);
      setTrackingNumber(code);
    } else {
      Alert.alert('Error', 'Please enter the airport code');
    }
  };

  const handleAddBag = () => {
    if (trackingNumber && location && flight) {
      // Replace with real logic to add the bag
      Alert.alert('Bag Added', `Tracking Number: ${trackingNumber}\nLocation: ${location}\nFlight: ${flight}`);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
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
      <Text style={styles.title}>Add a New Bag</Text>
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Flight"
        value={flight}
        onChangeText={setFlight}
        style={styles.input}
      />
      <TextInput
        placeholder="Airport Code (e.g., ATL)"
        value={airportCode}
        onChangeText={setAirportCode}
        style={styles.input}
      />
      <Button title="Generate Tracking Code" onPress={handleGenerateTrackingCode} />
      {generatedTrackingCode ? (
        <TextInput
          placeholder="Tracking Number"
          value={generatedTrackingCode}
          style={styles.input}
          editable={false}
        />
      ) : null}
      <Button title="Scan Bag Tag Barcode" onPress={() => setShowScanner(true)} />
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
      <Button title="Add Bag" onPress={handleAddBag} />
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
  generatedTrackingCode: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: 'blue',
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
