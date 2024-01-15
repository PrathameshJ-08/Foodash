import cartReducer from "./cartSlice";

import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
  }, //responsible to modify our app store, is a combination of diff small storesss
});

export default appStore;

//ADDING/ PROVIDING STORE TO OUR APPLI IN APP.JS
