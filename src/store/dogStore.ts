import { create } from "zustand"

export const useDogStore = create((set) => ({
    dogs: [],
    cart: [],

    addDog: (dog: any) =>
        set((state: any) => ({
            dogs: [...state.dogs, dog]
        })),

    addToCart: (dog: any) =>
        set((state: any) => ({
            cart: [...state.cart, dog]
        })),

    removeFromCart: (id: string) =>
        set((state: any) => ({
            cart: state.cart.filter((d: any) => d.id !== id)
        }))
}))