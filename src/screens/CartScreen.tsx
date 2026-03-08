import React, { useState } from "react"
import {
    View,
    Text,
    FlatList,
    Button,
    Alert,
    StyleSheet,
    Image,
    Modal,
    Pressable,
    TouchableOpacity
} from "react-native"

import { useCartStore } from "../store/cartStore"
import LottieView from "lottie-react-native"

export default function CartScreen() {

    const cart = useCartStore((s: any) => s.cart)
    const remove = useCartStore((s: any) => s.removeFromCart)
    const clear = useCartStore((s: any) => s.clearCart)
    const total = useCartStore((s: any) => s.total)
    const [modalVisible, setModalVisible] = useState(false);
    const [purchasedDogs, setPurchasedDogs] = useState<any[]>([])
    const [paidAmount, setPaidAmount] = useState(0)
    const purchase = () => { setPurchasedDogs(cart); setPaidAmount(total()); setModalVisible(true); clear() }

    return (

        <View style={styles.container}>

            {cart.length === 0 ? (

                <Text style={styles.empty}>
                    Your cart is empty
                </Text>

            ) : (

                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (

                            <View style={styles.card}>

                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.image}
                                />

                                <View style={styles.info}>
                                    <Text style={styles.name}>
                                        {item.name}
                                    </Text>

                                    <Button
                                        title="Remove"
                                        color="red"
                                        onPress={() => remove(item.id)}
                                    />
                                </View>

                                <View style={styles.priceContainer}>
                                    <Text style={styles.price}>
                                        ₹{item.price}
                                    </Text>
                                </View>

                            </View>

                        )}
                    />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>
                            ₹{total()}
                        </Text>
                    </View>

                    <View style={styles.purchaseBtn}>
                        <Button
                            title="Purchase"
                            color="#2ecc71"
                            onPress={purchase}
                        />
                    </View>

                </>

            )}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalContainer}>

                    <View style={styles.modalCard}>

                        <LottieView
                            source={require("../assets/success.json")}
                            autoPlay
                            loop={false}
                            style={{ width: 120, height: 120 }}
                        />

                        <Text style={styles.successTitle}>
                            Purchase Successful 🎉
                        </Text>

                        <Text style={styles.successTotal}>
                            Total Paid: ₹{paidAmount}
                        </Text>

                        <Text style={styles.listTitle}>
                            Dogs Purchased:
                        </Text>

                        {purchasedDogs.map((dog) => (
                            <Text key={dog.id} style={styles.dogItem}>
                                • {dog.name} ({dog.breed})
                            </Text>
                        ))}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.okButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        marginTop: 20
    },

    okButton: {
        backgroundColor: "#2ecc71",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        width: "100%"
    },

    okButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },

    modalCard: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 25,
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 }
    },

    successTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
        color: "#2ecc71"
    },

    successTotal: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: "600",
        color: "#333"
    },

    listTitle: {
        marginTop: 18,
        fontSize: 16,
        fontWeight: "600",
        alignSelf: "flex-start"
    },

    dogItem: {
        fontSize: 15,
        marginTop: 5,
        color: "#555",
        alignSelf: "flex-start"
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 12
    },

    info: {
        flex: 1,
        justifyContent: "space-between"
    },

    name: {
        fontSize: 18,
        fontWeight: "600"
    },

    priceContainer: {
        justifyContent: "flex-start"
    },

    price: {
        fontSize: 18,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        padding: 20,
    },

    empty: {
        textAlign: "center",
        marginTop: 60,
        fontSize: 18
    },











    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        borderTopWidth: 1,
        borderColor: "#ddd",
        paddingTop: 12
    },

    totalLabel: {
        fontSize: 20,
        fontWeight: "600"
    },

    totalAmount: {
        fontSize: 22,
        fontWeight: "bold"
    },

    purchaseBtn: {
        marginTop: 15
    }

})