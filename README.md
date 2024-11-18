# Bag-Trak

**Bag-Trak** is a mobile application designed to help passengers keep track of their luggage at the airport. Built with React Native and Expo, this app provides functionalities for managing and tracking checked-in bags, including generating and scanning tracking codes.

## Features

- **User Authentication**
  - Login and signup functionality
  - Forgot password and account recovery via email

- **Bag Tracking**
  - Add new bags with tracking numbers, check-in locations, and flight details
  - Track bags using a generated tracking code inputed during check-in, and get live updates in-app and with push notifications

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

2. **Navigate to the Project Directory**

   ```bash
   cd bag-trak
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Run the Application**

   ```bash
   npm start
   ```

   This will start the Expo development server and open the app in your default browser. You can also use the Expo Go app on your mobile device to scan the QR code and test the app.

## Today's Progress (7 August 2024)

### Enhanced Barcode Scanning Integration
- Updated the Add Bag Screen to automatically populate the form fields with scanned data. The viewfinder now directly updates the tracking number, location, and flight details upon successful barcode scan, eliminating the need for manual entry.

### Issue: Encountered an error while pushing to the remote repository due to divergent branches.
- **Fix**: Resolved the issue by performing a git pull to integrate remote changes and then handled conflicts by choosing the appropriate merging or rebasing strategy.

### UI Adjustments
- **Issue**: Needed to remove the "Add Bag" button from the viewfinder overlay and ensure that the barcode scanning updates the form fields directly.
- **Fix**: Updated the AddBagScreen to remove the button from the viewfinder overlay and adjusted the logic to automatically fill out form fields with scanned barcode data.

# Today's Progress (18 November 2024)

### Enhanced Live Bag Data Gathering and Tracking
- Updated the Add Bag Screen to automatically populate the LiveBagCard with data from AddBagScreen. The app now directly updates the user on the status of the bag by displaying the tracking number, location, and flight details upon successful data entry, eliminating the need for manual confirmation.

### UI Adjustments
- Removed the "+80" from the text color function in the `HomeScreen` to ensure proper text visibility in dark mode.
- Updated the AddBagScreen to remove the button from the viewfinder overlay and adjusted the logic to automatically fill out form fields with scanned barcode data.

### Issue Resolution
- Encountered an error while pushing to the remote repository due to divergent branches.
  - **Fix**: Resolved the issue by performing a git pull to integrate remote changes and then handled conflicts by choosing the appropriate merging or rebasing strategy.

## Today's Progress (18 November 2024)

### Work Done Today
- Fixed the text color issue in the `HomeScreen` to ensure it changes correctly based on the theme (black in light mode and white in dark mode).
- Verified that the `ScreenLayout` title is displayed correctly without duplicates.
- Ensured that the `BagHistoryScreen` correctly implements unique keys for list items to resolve the warning.
- Conducted testing to confirm that all navigation routes are functioning as expected.
- Reviewed and adjusted the responsive design of the app to ensure a consistent user experience across different devices.


## Technologies Used
- **React Native**: Framework for building native mobile applications
- **Expo**: Toolchain for React Native development
- **React Navigation**: Routing and navigation for React Native
- **React Native Picker**: Component for selecting from options (used for settings)

## Current Problems
### Frontend Issues
- [x] Text Color in Dark Mode: Fixed body text color to change based on theme.
- [ ] Unique Key Prop Warning: Resolve the warning regarding unique keys for list items.
- [ ] Navigation Issues: Ensure all navigation routes are functioning.
- [ ] Responsive Design: Check UI responsiveness.
- [ ] Error Handling: Implement error handling for user actions.

### Backend Issues
- [ ] API Integration: Ensure all API endpoints are correctly integrated.
- [ ] Authentication: Verify user authentication functionality.
- [ ] Data Persistence: Ensure data is stored and retrieved correctly.
- [ ] Error Logging: Implement error logging for backend processes.

## Note
- The backend folder has been renamed to `bag-trak-backend` for better clarity and organization.
