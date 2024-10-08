import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../components/ThemeContext'; // Import useTheme

const AppLanguageSelectionScreen = ({ isVisible, onClose, onSelectLanguage }) => {
  const { theme } = useTheme(); // Access theme
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.overlay }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Select App Language</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            style={[styles.picker, { color: theme.colors.text }]}
            itemStyle={{ color: theme.colors.text }} // Set item color based on theme
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
            {/* Add more languages as needed */}
          </Picker>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              onSelectLanguage(selectedLanguage);
              onClose();
            }}
          >
            <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '50%', // Ensure it takes half the screen height
  },
  title: {
    fontSize: 20,
    marginBottom: 2, // Reduced marginBottom to decrease space
    textAlign: 'center',
  },
  picker: {
    height: 150,
    width: '100%',
    marginBottom: 16, // Adjusted marginBottom to reduce space
  },
  button: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 50, // Added margin bottom to create space
  },
  buttonText: {
    fontSize: 16,
  },
  bottomSpacing: {
    height: 50, // Adjust height as needed to create space
  },
});


export default AppLanguageSelectionScreen;
