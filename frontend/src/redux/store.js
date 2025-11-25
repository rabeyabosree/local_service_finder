import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import serviceSlice from './reducers/serviceReducer';
import bookingReducer from './reducers/bookingReducer';
import testimonalSlice from './reducers/testimonalReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,   // authSlice → reducer assign
    service: serviceSlice,
    booking: bookingReducer,
    testimonals: testimonalSlice
  },
});

export default store;
