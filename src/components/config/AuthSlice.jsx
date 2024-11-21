import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    updateAddresses(state, action) {
      if (state.user && state.user.data && state.user.data.authResponse) {
        state.user.data.authResponse.user.addresses = action.payload;
      }
    },
  },
});

export const { setUser, clearUser, updateAddresses } = authSlice.actions;
export default authSlice.reducer;
