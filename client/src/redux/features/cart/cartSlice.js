import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [], // Array of products in the cart
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.03,
    grandTotal: 0,
}

// Create a slice of the Redux store

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((product) => product._id === action.payload._id);

            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 })
            } else {
                console.log("Product already exists!");
            }

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },

        updateQuantity: (state, action) => {
            const products = state.products.map((product) => {
                if (product._id === action.payload._id) {
                    if (action.payload.type === 'increment') {
                        product.quantity += 1
                    } else if (action.payload.type === 'decrement') {
                        if (product.quantity > 1) {
                            product.quantity -= 1;
                        }
                    }
                }
                return product;
            })

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },

        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload._id);

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },


        clearCart: (state) => {
            // Reset the state to initialState
            return initialState;
        },
    }
})

// Utility functions for derived state calculations

export const setSelectedItems = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity);
}, 0)

export const setPrice = (state) => state.products.reduce((total, product) => {
    return Number(total + product.quantity * product.price)
}, 0)

export const setTax = (state) => setPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
    return setPrice(state) + setTax(state);
}

export const { addToCart, updateQuantity, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;