import { createSlice } from '@reduxjs/toolkit';

// Initialize state from localStorage if it exists
const initialState = JSON.parse(localStorage.getItem('user')) || null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newState = action.payload;
      localStorage.setItem('user', JSON.stringify(newState));
      return newState;
    },
    clearUser: () => {
      localStorage.removeItem('user');
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
