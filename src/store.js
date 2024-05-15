import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

// Define the reducers here that are exported
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
// console.log(store.getState().cart);
// Infer the `RootState` and `AppDispatch` types from the store itself
//now we have our redux store configured to our react app
export default store;
