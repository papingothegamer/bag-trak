const admin = require('firebase-admin');
const User = require('../models/User');
const path = require('path');

let firebaseInitialized = false;

try {
  const serviceAccount = require(path.join(__dirname, '../config/firebase-service-account.json'));
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  firebaseInitialized = true;
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization failed:', error.message);
  console.warn('Notifications will be disabled');
}

const sendBagStatusNotification = async (userId, status, location, bagId) => {
  if (!firebaseInitialized) {
    console.log('Firebase not initialized, skipping notification');
    return null;
  }

  try {
    const user = await User.findById(userId);
    if (!user?.fcmToken) {
      return null;
    }

    const message = {
      notification: {
        title: 'Bag Status Update',
        body: `Your bag is now ${status} at ${location}`
      },
      data: {
        bagId: bagId.toString(),
        status,
        location,
        timestamp: new Date().toISOString()
      },
      token: user.fcmToken
    };

    const response = await admin.messaging().send(message);
    console.log('Notification sent:', response);
    return response;
  } catch (error) {
    console.error('Error sending notification:', error);
    return null;
  }
};

module.exports = {
  sendBagStatusNotification,
  isFirebaseInitialized: () => firebaseInitialized
};