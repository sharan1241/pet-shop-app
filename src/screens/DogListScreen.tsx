import React from "react"
import { FlatList, View, StyleSheet, Text } from "react-native"
import DogCard from "../components/DogCard"
import { useDogStore } from "../store/dogStore"

export default function DogListScreen() {

    const dogs = useDogStore((s: any) => s.dogs)
    return (
        <View style={styles.container}>

            <FlatList
                data={dogs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <DogCard dog={item} />}
                contentContainerStyle={dogs.length === 0 ? styles.emptyContainer : { padding: 12 }}
                ListEmptyComponent={() => (
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyText}>
                            No dogs available 🐶
                        </Text>
                        <Text style={styles.emptySubText}>
                            Please add a dog from the Add Dog tab
                        </Text>
                    </View>
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    emptyContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    emptyBox: {
        alignItems: "center"
    },

    emptyText: {
        fontSize: 20,
        fontWeight: "600"
    },

    emptySubText: {
        marginTop: 8,
        fontSize: 15,
        color: "#666"
    }

})