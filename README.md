# Bag-Trak

**Bag-Trak** is a mobile application designed to help passengers keep track of their luggage at the airport. Built with React Native and Expo, this app provides functionalities for managing and tracking checked-in bags, including generating and scanning tracking codes.

## Features

- **User Authentication**
  - Login and signup functionality
  - Forgot password and account recovery via email

- **Bag Tracking**
  - Add new bags with tracking numbers, check-in locations, and flight details
  - Scan barcode tags to automatically retrieve tracking information
  - Track bags using a generated tracking code or by scanning a barcode

- **Profile Management**
  - Update user settings (account verification methods, display settings, etc.)
  - Log out or delete the user account with confirmation
  - Manage notifications and language settings

## Screens

- **Login Screen**
  - Allows users to log in with their credentials
  - Provides an option to reset the password via email

- **Signup Screen**
  - Allows new users to create an account
  - Includes email verification

- **Home Screen**
  - Displays a list of tracked bags
  - Provides options to add a new bag or track an existing one

- **Add Bag Screen**
  - Form to input tracking number, check-in location, and flight details
  - Barcode scanner to scan the bag's tag
  - Generates a tracking code in the format: `BTRK-<6-digit-number>-<3-letter-airport-code>`

- **Track Bag Screen**
  - Form to input or scan a tracking code
  - Option to scan a barcode for tracking

- **Profile Screen**
  - Manage user settings and preferences
  - Logout functionality with confirmation
  - Delete account functionality with email confirmation

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/bag-trak.git
Navigate to the Project Directory

bash
Copy code
cd bag-trak
Install Dependencies

bash
Copy code
npm install
Run the Application

bash
Copy code
npm start
This will start the Expo development server and open the app in your default browser. You can also use the Expo Go app on your mobile device to scan the QR code and test the app.

Technologies Used
React Native - Framework for building native mobile applications
Expo - Toolchain for React Native development
React Navigation - Routing and navigation for React Native
React Native Picker - Component for selecting from options (used for settings)
