import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('viewprofile')) || null;

const viewProfileSlice = createSlice({
  name: 'viewprofile',
  initialState,
  reducers: {
    setViewProfile: (state, action) => {
      const newState = action.payload;
      localStorage.setItem('viewprofile', JSON.stringify(newState));
      return newState;
    },
    clearViewProfile: () => {
      localStorage.removeItem('viewprofile');
      return null;
    },
  },
});

export const { setViewProfile, clearViewProfile } = viewProfileSlice.actions;
export default viewProfileSlice.reducer;
