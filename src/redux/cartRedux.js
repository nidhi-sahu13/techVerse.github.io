import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    productsId: [],
    loading: false,
    error: null,
  },
  reducers: {
    increaseQuantity: (state, action) => {
      state.quantity += 1;
      state.productsId.push(action.payload);
    },
    decreseQuantity: (state, action) => {
      state.quantity -= 1;
      console.log(action.payload)
      state.productsId = state.productsId.filter((data) => {
        return action.payload !== data;
      });
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload.quantity;
      state.productsId = action.payload.id;
    },
    clearCart: (state, action) => {
      state.quantity = 0;
      state.productsId = [];
    },
  },
});

export const { increaseQuantity, decreseQuantity, setQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
