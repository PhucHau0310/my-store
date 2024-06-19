import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Reviews {
    id: number;
    productId: number;
    userId: string;
    rating: number;
    comment?: string | null;
    reviewDate: string;
    product: Product;
    user: User;
}

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    shippingAddress?: string | null;
    mobile?: string | null;
    passwordHash?: string | null;
    role: string;
}

interface Product {
    id?: number | undefined;
    name?: String | undefined;
    picture?: string | undefined;
    version?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    quantity?: number | undefined;
    published?: boolean | undefined;
    categoryId?: number | undefined;
    Review?: Reviews[] | undefined;
    quantityBuy?: number; // Add this line
}

interface CartItem extends Product {
    quantityBuy: number;
}

// interface CartState {
//     items: Product[];
//     success: boolean;
//     isLoading: boolean;
//     error: boolean;
// }

// const initialState: CartState = {
//     items: [],
//     success: false,
//     isLoading: false,
//     error: false,
// };

const initialState: Product[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addCart: (state, action: PayloadAction<Product>) => {
            state.push(action.payload);
        },
        deleteCarts: (state) => {
            state = [];
            return state;
        },
        deleteCart: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            return state.filter((product: Product) => product.id !== id);
        },
        updateQuantityBuy: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const product = state.findIndex((item) => item.id === id);

            if (product !== -10) {
                state[product].quantityBuy = quantity;
            }
        },
    },
});

export const { addCart, deleteCarts, deleteCart, updateQuantityBuy } =
    cartSlice.actions;
export default cartSlice.reducer;
