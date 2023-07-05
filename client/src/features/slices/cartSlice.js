import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { product, quantity } = action.payload;
      state.products.push(product);
      state.quantity += quantity;

      const productTotalPrice = parseFloat(product.price) * quantity;
      state.totalPrice = (
        parseFloat(state.totalPrice) + productTotalPrice
      ).toFixed(2);
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
