import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View, Text, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

import DogListScreen from "../screens/DogListScreen"
import AddDogScreen from "../screens/AddDogScreen"
import CartScreen from "../screens/CartScreen"

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,

                // Custom header with paw icon
                headerTitle: () => (
                    <View style={styles.headerContainer}>
                        <Ionicons name="paw" size={22} color="#2A52BE" style={{ marginRight: 6 }} />
                        <Text style={styles.headerText}>Pet Shop</Text>
                    </View>
                ),
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "transparent",
                    elevation: 0,
                    shadowOpacity: 0,
                },

                tabBarIcon: ({ color, size }) => {
                    let iconName: string = '' // explicitly string

                    if (route.name === "Dogs") iconName = "paw"
                    else if (route.name === "Add Dog") iconName = "add-circle"
                    else if (route.name === "Cart") iconName = "cart"

                    // fallback in case iconName is still empty
                    if (!iconName) iconName = "alert-circle"

                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name="Dogs" component={DogListScreen} />
            <Tab.Screen name="Add Dog" component={AddDogScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        fontSize: 26,
        fontWeight: "600",
        color: "#2A52BE",
        letterSpacing: 1.2,
        fontFamily: "Pacifico" // a prettier, cursive font
    }
})