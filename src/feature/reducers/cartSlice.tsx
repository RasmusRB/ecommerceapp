import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: cartState = {
  cartItems: [] as Product[],
  totalPrice: 0,
  productAdded: false,
  productRemoved: false,
  loggedIn: false,
  quantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: cartState, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === productToAdd.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.cartItems = [...state.cartItems];
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...productToAdd, quantity: 1 },
        ];
      }
      state.productAdded = true;
      state.totalPrice += productToAdd.price ?? 0;
    },
    removeFromCart: (state: cartState, action: PayloadAction<number>) => {
      const productIdToRemove = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.id === productIdToRemove
      );

      if (index !== -1) {
        const removedItem = state.cartItems[index];
        state.cartItems.splice(index, 1);
        state.productRemoved = true;
        state.totalPrice -= removedItem.price * removedItem.quantity;

        if (removedItem.quantity > 1) {
          state.cartItems = [
            ...state.cartItems,
            { ...removedItem, quantity: removedItem.quantity - 1 },
          ];
        }
      }
    },
    incrementQuantity: (state: cartState, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.cartItems.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
        state.totalPrice += item.price;
      }
    },
    resetProductAdded: (state: cartState) => {
      state.productAdded = false;
    },
    resetProductRemoved: (state: cartState) => {
      state.productRemoved = false;
    },
    clearCart: (state: cartState) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetProductAdded,
  resetProductRemoved,
  clearCart,
  incrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
