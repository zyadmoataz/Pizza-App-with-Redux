//its better to make tototalAmount and totalQuantity as a derived state
// const initialState = {
//   cartItems: [],
//   totalAmount: 0,
//   totalQuantity: 0,
// };

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  //   cart: [
  //     {
  //       pizzaId: 1,
  //       name: 'Margherita',
  //       quantity: 1,
  //       unitPrice: 10,
  //       totalPrice: 10,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      //payload = newItem > payload is what we pass to the action creator when we dispatch an action
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      //payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaceItemQuantity: (state, action) => {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload); //now you select the item
      item.quantity++; //increment the quantity to that item
      item.totalPrice = item.unitPrice * item.quantity; //update the total price
    },
    decreaseItemQuantity: (state, action) => {
      //payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload); //now you select the item
      item.quantity--; //decrement the quantity to that item
      item.totalPrice = item.unitPrice * item.quantity; //update the total price

      //nice trick to reuse the deleteItem reducer
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

//we have 5 reducers so we will have 5 action creators
export const {
  addItem,
  deleteItem,
  increaceItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

//id is the argument, we return the quantity
//we try to find the item in the cart with this pizza id and return the quantity or 0
export const getQuantitiyById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);
