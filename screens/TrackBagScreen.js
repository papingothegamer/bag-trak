import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

export default function TrackBagScreen() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const { theme, isDarkMode } = useTheme(); // Access theme and dark mode

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
    return <Text style={{ color: theme.colors.text }}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={{ color: theme.colors.text }}>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Track Your Bag</Text>
      <TextInput
        placeholder="Tracking Number"
        value={trackingNumber}
        onChangeText={setTrackingNumber}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000', placeholderTextColor: isDarkMode ? '#aaa' : '#888' }]}
      />
      <Button title="Scan Bag Tag Barcode" onPress={() => setShowScanner(true)} color={theme.colors.primary} />
      <Button title="Track Bag" onPress={handleTrackBag} color={theme.colors.primary} />
      
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
          {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} color={theme.colors.primary} />}
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