import React from "react"
import { View, Text, Image, Button, StyleSheet } from "react-native"
import { useCartStore } from "../store/cartStore"

export default function DogCard({ dog }: any) {

    const addToCart = useCartStore((s: any) => s.addToCart)
    const cart = useCartStore((s: any) => s.cart)

    const isInCart = cart.some((item: any) => item.id === dog.id)

    return (

        <View style={styles.card}>

            <Image
                source={{ uri: dog.image }}
                style={styles.image}
            />

            <View style={styles.details}>

                <View style={styles.topRow}>
                    <Text style={styles.name}>{dog.name}</Text>
                    <Text style={styles.price}>₹{dog.price}</Text>
                </View>

                <Text style={styles.breed}>
                    Breed: {dog.breed}
                </Text>

                <View style={styles.button}>
                    <Button
                        title={isInCart ? "Added to Cart ✓" : "Add to Cart"}
                        onPress={() => addToCart(dog)}
                        disabled={isInCart}
                        color={isInCart ? "gray" : "#2ecc71"}
                    />
                </View>

            </View>

        </View>

    )
}

const styles = StyleSheet.create({

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
        elevation: 3,
        alignItems: "center"
    },

    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 12
    },

    details: {
        flex: 1
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    name: {
        fontSize: 18,
        fontWeight: "bold"
    },

    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },

    breed: {
        fontSize: 14,
        color: "#666",
        marginTop: 4
    },

    button: {
        marginTop: 8
    }

})