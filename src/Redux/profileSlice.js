import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('profile')) || null;

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const newState = action.payload;
      localStorage.setItem('profile', JSON.stringify(newState));
      return newState;
    },
    clearUserProfile: () => {
      localStorage.removeItem('profile');
      return null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
