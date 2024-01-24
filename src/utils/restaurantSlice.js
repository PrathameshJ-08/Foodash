import { createSlice } from "@reduxjs/toolkit";

const loadRestaurantIdFromStorage = () => {
  return localStorage.getItem("currentCartRestaurant") || null;
};

const saveRestaurantIdToStorage = (restaurantId) => {
  localStorage.setItem("currentCartRestaurant", restaurantId);
};

const loadCurrentFromStorage = () => {
  return localStorage.getItem("currentRestaurant") || null;
};

const saveCurrentToStorage = (restaurantId) => {
  localStorage.setItem("currentRestaurant", restaurantId);
};
const loadResFromStorage = () => {
  try {
    const storedData = localStorage.getItem("resDetails");
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    return {};
  }
};

const saveResToStorage = (restaurantDetails) => {
  localStorage.setItem("resDetails", JSON.stringify(restaurantDetails));
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    resDetails: loadResFromStorage(),
    currentRestaurant: loadCurrentFromStorage(),
    currentCartRestaurant: loadRestaurantIdFromStorage(),
  },
  reducers: {
    setRestaurant: (state, action) => {
      state.currentRestaurant = action.payload;
      saveCurrentToStorage(action.payload);
    },

    setCartRestaurant: (state, action) => {
      state.currentCartRestaurant = action.payload;
      saveRestaurantIdToStorage(action.payload);
    },
    setResDetails: (state, action) => {
      state.resDetails = action.payload;
      saveResToStorage(action.payload);
    },
  },
});

export const { setRestaurant, setCartRestaurant, setResDetails } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
