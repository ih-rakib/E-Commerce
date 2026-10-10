import { createSlice } from "@reduxjs/toolkit"

const CART_STORAGE_KEY = 'cart';

const getProductId = (product) => product?._id ?? product?.id;

const loadCartFromLocalStorage = () => {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return undefined;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.products)) return undefined;
        // Normalize quantities/prices to numbers
        parsed.products = parsed.products.map((p) => ({
            ...p,
            quantity: Number(p.quantity) > 0 ? Number(p.quantity) : 1,
            price: Number(p.price) || 0,
        }));
        return parsed;
    } catch {
        return undefined;
    }
};

const persistCart = (state) => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
            products: state.products,
            selectedItems: state.selectedItems,
            totalPrice: state.totalPrice,
            tax: state.tax,
            taxRate: state.taxRate,
            grandTotal: state.grandTotal,
        }));
    } catch {
        // storage full / unavailable — cart still works in memory
    }
};

const initialState = loadCartFromLocalStorage() ?? {
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
            const incomingId = getProductId(action.payload);
            const isExist = state.products.find((product) => getProductId(product) === incomingId);

            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 })
            } else {
                // Increment quantity instead of silently ignoring re-adds
                isExist.quantity = (Number(isExist.quantity) || 1) + 1;
            }

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            persistCart(state);
        },

        updateQuantity: (state, action) => {
            const targetId = action.payload._id ?? action.payload.id;
            state.products.forEach((product) => {
                if (getProductId(product) === targetId) {
                    if (action.payload.type === 'increment') {
                        product.quantity = (Number(product.quantity) || 0) + 1;
                    } else if (action.payload.type === 'decrement') {
                        if (Number(product.quantity) > 1) {
                            product.quantity -= 1;
                        }
                    }
                }
            })

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            persistCart(state);
        },

        removeProduct: (state, action) => {
            const targetId = action.payload._id ?? action.payload.id;
            state.products = state.products.filter((product) => getProductId(product) !== targetId);

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
            persistCart(state);
        },


        clearCart: (state) => {
            // Reset the state to a fresh copy (avoid reusing frozen initialState)
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax = 0;
            state.grandTotal = 0;
            persistCart(state);
        },
    }
})

// Utility functions for derived state calculations

export const setSelectedItems = (state) => state.products.reduce((total, product) => {
    return total + (Number(product.quantity) || 0);
}, 0)

export const setPrice = (state) => state.products.reduce((total, product) => {
    return total + (Number(product.quantity) || 0) * (Number(product.price) || 0)
}, 0)

export const setTax = (state) => setPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
    return setPrice(state) + setTax(state);
}

export const { addToCart, updateQuantity, removeProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
