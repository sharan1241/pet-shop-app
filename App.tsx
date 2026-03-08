import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <LinearGradient
      colors={['#E0F7FF', '#B3E5FC']} // very light blue → slightly deeper light blue
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }} // vertical gradient
      style={styles.gradient}
    >
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: 'transparent' },
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <RootNavigator />
      </NavigationContainer>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});