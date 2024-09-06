import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useTheme } from '../components/ThemeContext'; 

const generateTrackingCode = (airportCode) => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
  return `BTRK-${randomNumber}-${airportCode}`;
};

export default function AddBagScreen({ navigation, route }) {
  const { isDarkMode, theme } = useTheme(); // Access theme
  const [trackingNumber, setTrackingNumber] = useState('');
  const [location, setLocation] = useState('');
  const [flight, setFlight] = useState('');
  const [airportCode, setAirportCode] = useState('');
  const [weight, setWeight] = useState('');
  const [airline, setAirline] = useState('');
  const [destination, setDestination] = useState('');
  const [flightTime, setFlightTime] = useState('');
  const [generatedTrackingCode, setGeneratedTrackingCode] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const { setBags } = route.params; // Get the setBags function from route params

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
    if (trackingNumber && location && flight && weight && airline && destination && flightTime) {
      const newBag = {
        id: trackingNumber,
        location,
        flight,
        weight,
        airline,
        from: airportCode,
        to: destination,
        flightTime,
      };

      setBags(prevBags => [...prevBags, newBag]); // Update bag list in HomeScreen

      Alert.alert('Bag Added', `Tracking Number: ${trackingNumber}\nLocation: ${location}\nFlight: ${flight}`);
      navigation.navigate('Home'); // Navigate back to HomeScreen
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.titleText }]}>Add a new bag</Text>
      
      {/* Full width forms */}
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />
      <TextInput
        placeholder="Flight"
        value={flight}
        onChangeText={setFlight}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />

      {/* Bento-style smaller forms */}
      <View style={styles.row}>
        <TextInput
          placeholder="Airport Code"
          value={airportCode}
          onChangeText={setAirportCode}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />
        <TextInput
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="Destination Airport"
          value={destination}
          onChangeText={setDestination}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />
        <TextInput
          placeholder="Flight Time (e.g., 15:30)"
          value={flightTime}
          onChangeText={setFlightTime}
          style={[styles.smallInput, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        />
      </View>

      <TextInput
        placeholder="Airline"
        value={airline}
        onChangeText={setAirline}
        style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
      />

      <Button title="Generate Tracking Code" onPress={handleGenerateTrackingCode} color={theme.colors.primary} />
      {generatedTrackingCode ? (
        <TextInput
          placeholder="Tracking Number"
          value={generatedTrackingCode}
          style={[styles.input, { borderColor: isDarkMode ? '#333' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          editable={false}
        />
      ) : null}
      <Button title="Scan Barcode" onPress={() => setShowScanner(true)} color={theme.colors.primary} />
      <Button title="Add Bag" onPress={handleAddBag} color={theme.colors.primary} />
      {showScanner && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  smallInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    flex: 0.48,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
