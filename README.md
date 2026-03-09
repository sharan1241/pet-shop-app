# Pet Shop – Mobile App

A **React Native mobile app** to upload pet details, fetch random pet images, and manage a shopping cart using **global state management (Zustand)**. The app provides a modern UI with gradient backgrounds, icons, and form validation, all without a backend.

---

## Features

- **Upload pet image** from Camera or Gallery with preview  
- **Pet details form** with validation:
  - Name (required, letters only, min 3 characters)  
  - Breed (required, letters only, min 5 characters)  
  - Age (required)  
  - Price (required, minimum 3 digits)  
- **Fetch random dog images** from API  
- **Pet listing** with card-based layout:
  - Image  
  - Name  
  - Breed  
  - Price  
  - Add to Cart button  
- **Cart management**:
  - Add/remove items  
  - View total price  
- **Loading indicators** for image uploads  
- **Modern UI** with gradient backgrounds, icons, and stylish headers  
- **Global state management** using **Zustand** (no backend required)  

---

## API Used

- **GET** `https://dog.ceo/api/breeds/image/random` – Fetch random dog image  

> Note: Pet details are **managed locally** via Zustand, no POST API is used.

---

## Libraries Used

- React Native  
- React Navigation (Bottom Tabs + Stack)  
- Axios  
- Zustand  
- React Hook Form  
- Yup  
- React Native Image Picker  
- Linear Gradient  
- Ionicons  

---

## Screens / Components

- **AddPetScreen** – Upload image, fill pet details, submit form  
- **DogListScreen** – View all added pets in a card layout  
- **CartScreen** – View cart, remove items, see total price  
- **Reusable Components** – Buttons, headers, cards  
- **Navigation** – Bottom Tab Navigator with custom header including paw icon  

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/sharan1241/pet-shop-app.git
cd pet-shop-app

for android
npm install

for ios
pod install

for android
npx react-native run-android

for ios
npx react-native run-ios
