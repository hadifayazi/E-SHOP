import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userApi from "../features/api/userApi";
import productApi from "../features/api/productApi";
import stripeApi from "../features/api/stripeApi";
import { authReducer } from "../features/slices/authSlice";
import { cartReducer } from "../features/slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [stripeApi.reducerPath]: stripeApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      productApi.middleware,
      stripeApi.middleware
    ),
});
setupListeners(store.dispatch);

export default store;
