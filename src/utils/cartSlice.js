import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { items: [] };
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.card.info.id === newItem.card.info.id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
        state.items[existingItemIndex].totalPrice =
          state.items[existingItemIndex].quantity * newItem.card.info.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.card.info.price,
        });
      }
      saveCartToStorage(state);
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
          // quantity 1, remove from cart
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
      saveCartToStorage({ items: [] });
      return { items: [], currentRestaurant: null };
    },

    setRestaurant: (state, action) => {
      state.currentRestaurant = action.payload;
    },
  },
});

export const {
  addToCart,
  removeItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  setRestaurant,
} = cartSlice.actions;

export default cartSlice.reducer;
