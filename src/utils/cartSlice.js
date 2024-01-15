import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.card.info.id === newItem.card.info.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, increase its quantity
        state.items[existingItemIndex].quantity++;
        state.items[existingItemIndex].totalPrice =
          state.items[existingItemIndex].quantity * newItem.card.info.price;
      } else {
        // If the item doesn't exist, add a new entry
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.card.info.price,
        });
      }
    },

    increaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(
        (item) => item.card.info.id === itemId
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.card.info.price;
      }
    },

    decreaseItemQuantity: (state, action) => {
      const removedItem = state.items.find(
        (item) => item.card.info.id === action.payload
      );

      if (removedItem) {
        if (removedItem.quantity > 1) {
          removedItem.quantity--;
          removedItem.totalPrice =
            removedItem.quantity * removedItem.card.info.price;
        } else {
          // If quantity is 1, remove the item from the cart
          state.items = state.items.filter(
            (item) => item.card.info.id !== action.payload
          );
        }
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.card.info.id !== action.payload
      );
    },

    clearCart: (state) => {
      return { items: [] };
    },
  },
});

export const {
  addToCart,
  removeItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
