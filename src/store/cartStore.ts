import { create } from "zustand"

interface Dog {
    id: string
    name: string
    breed: string
    price: number
    image: string
}

interface CartState {
    cart: Dog[]
    addToCart: (dog: Dog) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
    total: () => number
}

export const useCartStore = create<CartState>((set, get) => ({

    cart: [],

    addToCart: (dog) =>
        set((state) => ({
            cart: [...state.cart, dog]
        })),

    removeFromCart: (id) =>
        set((state) => ({
            cart: state.cart.filter((d) => d.id !== id)
        })),

    clearCart: () =>
        set({ cart: [] }),

    total: () => {
        const cart = get().cart
        return cart.reduce((sum, item) => sum + item.price, 0)
    }

}))