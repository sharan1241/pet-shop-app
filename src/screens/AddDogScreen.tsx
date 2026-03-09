import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
    ActivityIndicator
} from "react-native"
import Toast from 'react-native-simple-toast'
import { launchImageLibrary } from "react-native-image-picker"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Ionicons from "react-native-vector-icons/Ionicons"

import { useDogStore } from "../store/dogStore"
import { getRandomDog } from "../api/dogApi"

const schema = yup.object({
    name: yup
        .string()
        .required("This field must be filled")
        .min(3, "Name must be at least 3 characters")
        .matches(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),

    breed: yup
        .string()
        .required("This field must be filled")
        .min(5, "Breed must be at least 5 characters")
        .matches(/^[A-Za-z ]+$/, "Breed can only contain letters and spaces"),

    price: yup
        .number()
        .typeError("Price must be a number")
        .required("This field must be filled")
        .test(
            "min-digits",
            "Price must be at least 3 digits",
            (value) => {
                if (!value) return false
                return value.toString().length >= 3
            }
        )
})

export default function AddDogScreen() {

    const addDog = useDogStore((s: any) => s.addDog)

    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    })

    const randomDog = async () => {
        setLoading(true)
        const img = await getRandomDog()
        setLoading(false)
        setImage(img)

    }

    const uploadImage = () => {
        setLoading(true)
        const options: any = {
            mediaType: "photo",
            quality: 1
        }

        launchImageLibrary(options, (response) => {

            if (response.didCancel) return

            if (response.errorCode) {
                Alert.alert("Error selecting image")
                return
            }

            const uri = response.assets?.[0]?.uri

            if (uri) {
                setLoading(false)
                setImage(uri)
            }

        })
    }

    const onSubmit = (data: any) => {

        if (!image) {
            Alert.alert("Please select an image")
            return
        }

        const dog = {
            id: Date.now().toString(),
            name: data.name,
            breed: data.breed,
            price: Number(data.price),
            image
        }

        addDog(dog)

        Toast.show('Dog added successfully!', Toast.SHORT)

        reset()
        setImage("")
    }

    return (
        <KeyboardAwareScrollView>

            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >

                {/* IMAGE SECTION */}

                <View style={styles.imageContainer}>

                    {image && !loading ? (
                        <>
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                            />

                            <TouchableOpacity
                                style={styles.trashIcon}
                                onPress={() => setImage("")}
                            >
                                <Ionicons name="trash" size={22} color="white" />
                            </TouchableOpacity>
                        </>
                    ) : (
                        !image && !loading ?
                            <View style={styles.placeholder}>
                                <Ionicons name="image-outline" size={60} color="#aaa" />
                                <Text style={{ color: "#aaa", marginTop: 5 }}>
                                    No image selected
                                </Text>
                            </View>
                            : <View style={styles.image}>
                                <ActivityIndicator size={"large"} color='black' />
                            </View>
                    )}

                </View>

                {/* IMAGE BUTTONS */}

                <View style={styles.buttonRow}>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.randomButton]}
                        onPress={randomDog}
                    >
                        <Ionicons name="shuffle" size={20} color="white" />
                        <Text style={styles.buttonText}>Random Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.uploadButton]}
                        onPress={uploadImage}
                    >
                        <Ionicons name="cloud-upload-outline" size={20} color="white" />
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>

                </View>

                {/* NAME */}

                <Text style={styles.label}>Dog Name</Text>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                placeholder="Enter dog name"
                                value={value}
                                onChangeText={onChange}
                                style={[
                                    styles.input,
                                    errors.name && styles.errorInput
                                ]}
                            />

                            {errors.name && (
                                <Text style={styles.errorText}>
                                    {errors.name.message}
                                </Text>
                            )}
                        </>
                    )}
                />

                {/* BREED */}

                <Text style={styles.label}>Breed</Text>

                <Controller
                    control={control}
                    name="breed"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                placeholder="Enter breed"
                                value={value}
                                onChangeText={onChange}
                                style={[
                                    styles.input,
                                    errors.breed && styles.errorInput
                                ]}
                            />

                            {errors.breed && (
                                <Text style={styles.errorText}>
                                    {errors.breed.message}
                                </Text>
                            )}
                        </>
                    )}
                />

                {/* PRICE */}

                <Text style={styles.label}>Price</Text>

                <Controller
                    control={control}
                    name="price"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                placeholder="Enter price"
                                value={value ? value.toString() : ''} // convert number to string
                                onChangeText={onChange}
                                keyboardType="numeric"
                                style={[styles.input, errors.price && styles.errorInput]}
                            />

                            {errors.price && (
                                <Text style={styles.errorText}>
                                    {errors.price.message}
                                </Text>
                            )}
                        </>
                    )}
                />

                {/* SUBMIT BUTTON */}

                <View style={styles.submitButton}>
                    <Button
                        title="Add Dog"
                        color="#2ecc71"
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || !image}
                    />
                </View>

            </ScrollView>

        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },

    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 10,
        marginHorizontal: 5,
        elevation: 3
    },

    randomButton: {
        backgroundColor: "#3498db"
    },

    uploadButton: {
        backgroundColor: "#9b59b6"
    },

    buttonText: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 6
    },
    container: {
        padding: 20,
        paddingBottom: 60,
    },

    imageContainer: {
        position: "relative",
        marginBottom: 15,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 3
    },

    image: {
        height: 220,
        borderRadius: 12,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center"
    },

    placeholder: {
        height: 220,
        borderRadius: 12,
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd"
    },

    trashIcon: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: 8,
        borderRadius: 20
    },



    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5
    },

    label: {
        marginTop: 18,
        marginBottom: 5,
        fontSize: 15,
        fontWeight: "600",
        color: "#333"
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 14,
        borderRadius: 10,
        backgroundColor: "#fff",
        fontSize: 16
    },

    errorInput: {
        borderColor: "red"
    },

    errorText: {
        color: "red",
        marginTop: 4
    },

    submitButton: {
        marginTop: 25,
        borderRadius: 8,
        overflow: "hidden"
    }

})