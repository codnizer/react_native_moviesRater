# 🎬 moviesRater - React Native Movie App

A sleek and modern React Native movie discovery application built with Expo. Users can browse, search, and save their favorite movies. The app features a dynamic tab-based navigation, a persistent favorites system, and fetches all data from The Movie Database (TMDB) API.

## ✨ Features

- **Movie Discovery**: Browse carousels of "Now Playing," "Popular," and "Top Rated" movies on the main screen.
- **Dynamic Search**: Instantly search for any movie with a debounced search bar that provides live results.
- **Detailed View**: Tap any movie to see a detailed screen with its backdrop, poster, rating, runtime, genres, and plot summary.
- **Favorites System**: Save movies to a persistent "Saved" list. The "like" button provides instant visual feedback.
- **Persistent Storage**: Saved movies are stored locally on the user's device using AsyncStorage and managed globally with React Context.
- **Tab Navigation**: A clean bottom tab navigator to switch between the "Discover" and "Saved" screens.

## 🛠 Tech Stack

- **Core**: React Native, Expo
- **Navigation**: React Navigation (Bottom Tabs & Native Stack)
- **State Management**: React Context API (for managing favorites)
- **Data Fetching**: Axios
- **API**: The Movie Database (TMDB)
- **Local Storage**: @react-native-async-storage/async-storage
- **UI Components**: expo-linear-gradient, @expo/vector-icons

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (LTS version recommended)
- Expo Go app on your iOS or Android device (for development)
- expo-cli installed globally (or use npx)

### 2. Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/codnizer/react_native_moviesRater.git
cd moviesRater
npm install
```
### 3. API Configuration

This project requires a v4 Access Token from The Movie Database (TMDB).

1. Sign up for a free TMDB account at [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Go to your account **Settings > API** and generate a new v4 Access Token
3. Open `api/tmdb.js` and paste your token into the `API_ACCESS_TOKEN` constant:

```javascript
// api/tmdb.js

// --- IMPORTANT ---
// Replace this with your v4 Access Token from TMDB
const API_ACCESS_TOKEN = 'YOUR_V4_ACCESS_TOKEN_GOES_HERE';
// -----------------
```
### 4. Running the App

Start the Expo development server:

```bash
npm start
```
Scan the QR code with the Expo Go app on your phone to launch the project.

### 📁 File Structure

Here is a simplified overview of the project structure:
```text
├── api/
│   └── tmdb.js           # All TMDB API calls and Axios setup
├── assets/               # App icons and splash screens
├── components/
│   ├── MovieCard.js      # Reusable card for movie posters
│   └── Rating.js         # Star rating component
├── context/
│   └── FavoritesContext.js # Global state for saved movies
├── navigation/
│   └── AppNavigator.js   # Main Tab and Stack navigators
├── screens/
│   ├── HomeScreen.js     # Discover and Search screen
│   ├── DetailScreen.js   # Movie details screen
│   └── SavedScreen.js    # Screen for favorited movies
└── App.js                # Root component with Navigation/Context providers
```