import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'http://192.168.18.11:5000';

export const ENDPOINTS = {
  bags: {
    active: `${API_URL}/api/bags/active`,
    details: (id) => `${API_URL}/api/bags/${id}`,
    update: (id) => `${API_URL}/api/bags/${id}/status`,
    create: `${API_URL}/api/bags`,
    history: (id) => `${API_URL}/api/bags/${id}/history`,
    location: (id) => `${API_URL}/api/bags/${id}/location`,
  },
  auth: {
    login: `${API_URL}/api/auth/login`,
    register: `${API_URL}/api/auth/register`,
    updateToken: `${API_URL}/api/auth/fcm-token`,
    profile: `${API_URL}/api/auth/profile`,
  }
};

// API service functions
export const api = {
  async getHeaders() {
    const token = await AsyncStorage.getItem('userToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  },

  // Bag endpoints
  async createBag(bagData) {
    try {
      const response = await fetch(ENDPOINTS.bags.create, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify(bagData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating bag:', error);
      throw error;
    }
  },

  async getActiveBags() {
    try {
      const headers = await this.getHeaders();
      console.log('Fetching from:', ENDPOINTS.bags.active);
      console.log('With headers:', headers);
      
      const response = await fetch(ENDPOINTS.bags.active, {
        headers: headers
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API response:', data);
      return data;
    } catch (error) {
      console.error('Error in getActiveBags:', error);
      throw error;
    }
  },

  async getBagDetails(bagId) {
    try {
      const response = await fetch(ENDPOINTS.bags.details(bagId), {
        headers: await this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching bag details:', error);
      throw error;
    }
  },

  async updateBagStatus(bagId, status, location) {
    try {
      const response = await fetch(ENDPOINTS.bags.update(bagId), {
        method: 'PUT',
        headers: await this.getHeaders(),
        body: JSON.stringify({ status, location })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating bag status:', error);
      throw error;
    }
  },

  async getBagHistory(bagId) {
    try {
      const response = await fetch(ENDPOINTS.bags.history(bagId), {
        headers: await this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching bag history:', error);
      throw error;
    }
  },

  // Auth endpoints
  async login(email, password) {
    try {
      const response = await fetch(ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async updatePushToken(fcmToken) {
    try {
      const response = await fetch(ENDPOINTS.auth.updateToken, {
        method: 'POST',
        headers: await this.getHeaders(),
        body: JSON.stringify({ fcmToken })
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating push token:', error);
      throw error;
    }
  },

  async getUserProfile() {
    try {
      const response = await fetch(ENDPOINTS.auth.profile, {
        headers: await this.getHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
};