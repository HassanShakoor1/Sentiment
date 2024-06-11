import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import viewprofileReducer from './viewProfileSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer,
    viewprofile:viewprofileReducer,
  },
});

export default store;

