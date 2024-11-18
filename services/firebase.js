import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// Configure how notifications should be handled
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const API_URL = 'http://192.168.X.X:5000'; // Replace X.X with your IP

export const initializeFirebase = async () => {
  try {
    if (!Device.isDevice) {
      console.log('Must use physical device for notifications');
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permission');
      return;
    }

    // For testing in Expo Go, we'll use a simulated token
    const simulatedToken = 'EXPO-SIMULATED-PUSH-TOKEN-' + Date.now();
    console.log('Simulated push token:', simulatedToken);

    // Store token locally
    await AsyncStorage.setItem('pushToken', simulatedToken);

    // Send token to your backend
    await updatePushToken(simulatedToken);

    return simulatedToken;
  } catch (error) {
    console.log('Error initializing notifications:', error);
  }
};

const updatePushToken = async (token) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
      console.log('No user token found, skipping push token update');
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/fcm-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ fcmToken: token })
    });

    const data = await response.json();
    console.log('Push token updated on backend:', data);
  } catch (error) {
    console.log('Error updating push token:', error);
  }
};

export const setupNotificationListeners = () => {
  const notificationListener = Notifications.addNotificationReceivedListener(
    notification => {
      console.log('Received notification:', notification);
    }
  );

  const responseListener = Notifications.addNotificationResponseReceivedListener(
    response => {
      console.log('Notification tapped:', response);
    }
  );

  // Return cleanup function
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
};
