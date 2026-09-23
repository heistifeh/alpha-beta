# Alpha Beta

A mobile banking app built with Expo and React Native. It has a home screen, account details, cards, wallets and a services/billers screen, all using mock data to simulate a real API.

## How it was built

I started the project with Expo (using the default Expo Router template), then set it up the way I wanted:

- Installed NativeWind (`nativewind@^4.2.7`) with `tailwindcss@^3.4.19` for styling with Tailwind classes in React Native.
- Installed Zustand (`zustand@^5.0.15`) for state management.
- Used Expo Router for navigation, with screens organized as tabs under `src/app/(tabs)`.
- Used `@expo/vector-icons` for icons and `expo-image`, `expo-linear-gradient`, `expo-glass-effect` for parts of the UI.

## Project structure

- `src/app` - screens and layouts (Expo Router file-based routing)
- `src/components` - reusable UI components
- `src/store` - Zustand stores
- `src/services` - mock service functions that simulate API calls with a network delay
- `src/data` - the mock data used by the services
- `src/types` - shared TypeScript types
- `src/utils` - helper functions

## Mock data / API

There is no real backend. The `src/services` folder has functions like `getCurrentUser`, `getAccount`, `getRecentTransactions` and `getBillers` that return data from `src/data` after a short simulated delay, so the app behaves like it is talking to a live API.

## Running the app

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. From the terminal output you can open the app in:
   - a development build
   - an Android emulator
   - an iOS simulator
   - Expo Go

No environment variables or API keys are needed since the app runs entirely on mock data.

## Requirements

- Node.js and npm
- Expo CLI (comes through `npx`, no global install needed)
- For iOS: a Mac with Xcode installed if you want to run the iOS simulator, or the Expo Go app on a physical device
- For Android: Android Studio with an emulator set up, or the Expo Go app on a physical device

