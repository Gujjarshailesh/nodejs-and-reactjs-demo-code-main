import { createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from 'libs/HttpClient';

/**
 * Initial Values of globally declared states in redux
 */
const initialState = {
  user: '',
  isAdminLoggedIn: false,
  accessToken: '',
};

/**
 * Slice for authentication Info
 */
export const authSlice = createSlice({
  name: 'user',
  initialState: initialState,
  /**
   * Reducer functions
   */
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.payload = payload;
      state.user = payload.userData;
      state.isAdminLoggedIn = true;
      state.accessToken = payload.accessToken;
      setAuthToken(payload.accessToken);
      return state;
    },
    updateUserData: (state, { payload }) => {
      state.user = payload.userData;
      return state;
    },
    updateToken: (state, { payload }) => {
      state.isLoggedIn = true;
      state.accessToken = payload;
      setAuthToken(payload);
      return state;
    },
    logoutSuccess: () => initialState,
  },
});
export const { loginSuccess, logoutSuccess, updateUserData, updateToken } = authSlice.actions;
export const loggedUser = (state) => state.user;
export default authSlice.reducer;
