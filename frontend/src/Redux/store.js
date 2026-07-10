import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const loadCart = () => {
  try {
    const cart = localStorage.getItem("cart");

    if (cart) {
      return JSON.parse(cart);
    }

    return undefined;
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState: {
    cart: loadCart(),
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(store.getState().cart)
  );
});