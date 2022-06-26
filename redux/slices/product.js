import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  comments: [],
  delivery: null,
  description: null,
  discount: null,
  features: [],
  id: null,
  image: [],
  manufacturer: null,
  monthlyPay: null,
  name: null,
  price: null,
  quantity: null,
  seller: null,
  slug: null,
  subtitle: null,
  supplier: null,
  varieties: [],
  warrantyPeriod: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (_, { payload }) => payload,
    setComments: (state, { payload }) => { state.comments = payload }
  }
});

export const { addProduct, setComments } = productSlice.actions;

export default productSlice.reducer;
