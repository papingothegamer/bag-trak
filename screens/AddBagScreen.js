import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useTheme } from '../components/ThemeContext'; 

const generateTrackingCode = (airportCode) => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  return `BTRK-${randomNumber}-${airportCode}`;
};

export default function AddBagScreen({ navigation }) {
  const { isDarkMode, theme } = useTheme(); // Access theme
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
    // Simulate processing of scanned data and filling out form fields
    const [scannedTrackingNumber, scannedLocation, scannedFlight] = data.split('|'); // Adjust based on actual data format
    setTrackingNumber(scannedTrackingNumber || '');
    setLocation(scannedLocation || '');
    setFlight(scannedFlight || '');
    setShowScanner(false);
    Alert.alert('Barcode Scanned', `Tracking Number: ${scannedTrackingNumber}`);
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
    return <Text style={{ color: theme.colors.text }}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{ color: theme.colors.text }}>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.titleText }]}>add a new bag</Text>
      <TextInput
        placeholder="location"
        value={location}
        onChangeText={setLocation}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
      <TextInput
        placeholder="flight"
        value={flight}
        onChangeText={setFlight}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
      <TextInput
        placeholder="airport code (e.g., ATL)"
        value={airportCode}
        onChangeText={setAirportCode}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
      <Button title="generate tracking code" onPress={handleGenerateTrackingCode} color={theme.colors.primary} />
      {generatedTrackingCode ? (
        <TextInput
          placeholder="tracking Number"
          value={generatedTrackingCode}
          style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          editable={false}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />
      ) : null}
      {!showScanner && (
        <Button title="add bag" onPress={handleAddBag} color={theme.colors.primary} />
      )}
      <Button title="scan tag barcode" onPress={() => setShowScanner(true)} color={theme.colors.primary} />
      
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
          {scanned && <Button title="tap to scan again" onPress={() => setScanned(false)} color={theme.colors.primary} />}
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
    height: 40,
    borderWidth: 1,
    borderRadius: 5, // Rounded edges
    marginBottom: 12,
    paddingHorizontal: 8,
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
