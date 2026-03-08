import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./TabNavigator";
import CartScreen from "../screens/CartScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={Tabs}
                options={({ navigation }) => ({
                    headerShown: false,
                    headerRight: () => (
                        <Ionicons
                            name="cart"
                            size={24}
                            style={{ marginRight: 15 }}
                            onPress={() => navigation.navigate("Cart")}
                        />
                    ),
                })}
            />

            {/* <Stack.Screen
                name="Cart"
                component={CartScreen}
            /> */}

        </Stack.Navigator>
    );
}