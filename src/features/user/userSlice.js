import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//this function is responsible for getting the user's geolocation position and returning it
//this is async because we are using the navigator.geolocation.getCurrentPosition()
//while its async we cannot call this function directly inside the redux reducer as redux is synchronous
// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

//so we have to use thunk which is a middleware "that sits between the dispatching and the reducer itslef" that allows us to return a function instead of an action
//thunk receives two things, the action name and async function that will return the payload for the reducer later
//now this fetch address will be the action creator function that we will call in our code
//first > action name is never use but redux need it internally, second > we pass the code we want to execute as soon as this action is beeing dispatched
//create async thunk will produce 3 addional action types 1- pending 2- fulfilled 3- rejected > we need to handle these cases separately in our reducers, this is how we connect our thunk with our reducers
export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  //payload of the fulfilled state
  return { position, address };
});

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

//we created a slice of a global ui state, slice called user has the given initial state, and have a reducer that is ressponsible for updating the state object when an action is dispatched "received from the ui"

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //this reducer is responsible for updating the state object when an action is dispatched
    //we do that using the action creator "updateName" which returns an action that was autamoticly created by createSlice
    updateName: (state, action) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    //this is how we connect our thunk with our reducers
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error';
        state.error =
          'There was a problem in getting your address. Make sure to fill this field.';
      });
  },
});

//inside user slice we will get access to action creators so we can update the name using this action creator
export const { updateName } = userSlice.actions;

//now we can use this reducer to setup our store
export default userSlice.reducer;

export const getUser = (state) => state.user.username;
