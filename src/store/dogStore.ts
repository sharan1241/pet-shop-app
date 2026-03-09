import { create } from 'zustand'
import { Dog } from '../types/Dog'

type DogStore = {
    dogs: Dog[]
    cart: Dog[]
    addDog: (dog: Dog) => void
    addToCart: (dogId: string) => void
    purchaseCart: (cartDogs: Dog[]) => void
}

export const useDogStore = create<DogStore>((set) => ({
    dogs: [],
    cart: [],

    // Add new dog to store
    addDog: (dog: Dog) =>
        set((state) => ({ dogs: [...state.dogs, { ...dog, purchased: false }] })),

    // Add dog to cart, do NOT mark as purchased yet
    addToCart: (dogId: string) =>
        set((state) => {
            const dog = state.dogs.find((d) => d.id === dogId)
            if (!dog) return state
            return { ...state, cart: [...state.cart, dog] }
        }),

    // Purchase all dogs in cart
    purchaseCart: (cartDogs: any) =>
        set((state) => ({
            dogs: state.dogs.map((dog) =>
                cartDogs.find((c: any) => c.id === dog.id)
                    ? { ...dog, purchased: true }
                    : dog
            ),
        }))
}))