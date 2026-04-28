# E-Commerce App

React Native e-commerce app with infinite scroll, cart persistence, and offline caching.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (or iOS/Android emulator)

### Installation

1. Clone the repo
git clone git@github.com:rgcjhn/rn-ecommerce-demo.git
cd rn-ecommerce-demo

2. Install dependencies
npm install

3. Start the app
npm start

4. Run on device
- Press i for iOS simulator
- Press a for Android emulator
- Scan QR code with Expo Go app

## Technical Decisions

### State Management
- Redux Toolkit + RTK Query - Handles API calls, caching, and offline support
- Redux Persist - Saves cart data locally

### Why these choices?
- RTK Query provides automatic caching - no manual implementation needed
- Redux Persist persists cart with less lines of code
- Both work well together for offline-first apps

### Architecture
- Feature-based modules (products, cart)
- Shared components for reusability
- Centralized styles for theming (colors, typography, spaces, etc.)

## Features
- Infinite scroll product list
- Add/remove from cart
- Cart persists after app restart
- Offline caching (view products without internet)
- Product details with images

## Tech Stack
- React Native (Expo)
- TypeScript
- Redux Toolkit + RTK Query
- Redux Persist
- React Navigation

## Build Instructions

### Android APK
expo build:android -t apk

### iOS IPA
expo build:ios -t archive

## Project Structure
```
src/
├── features/     # Products, Cart features
├── shared/       # Reusable components, styles
├── store/        # Redux configuration
└── app/          # Navigation & entry point
```
