import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantSlice";

import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    restaurant: restaurantReducer,
  },
});

export default appStore;
