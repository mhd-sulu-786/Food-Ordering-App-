// orderhistorySlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: []
};

export const orderhistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(...action.payload);
    }
  }
});

export const { addOrder } = orderhistorySlice.actions;

export default orderhistorySlice.reducer;
