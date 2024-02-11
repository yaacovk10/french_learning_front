import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login } from './LoginAPI';

// Defines the shape of the login state within the Redux store
export interface loginState {
  username: string;
  password: string;
  status: 'idle' | 'loading' | 'failed';
  token: string;
  logged: boolean
}

// Initial state for the login slice, sets the default values
const initialState: loginState = {
  username: "",
  password: "",
  status: 'idle',
  token: '',
  logged: false
};

// Asynchronous thunk action for performing the login operation
export const loginAsync = createAsyncThunk(
  'login/login',
  async (credentials:{username: string, password:string}) => {
    const response = await login(credentials);// Calls the login API function
    return response.data;// The return value becomes the `fulfilled` action payload
  }
);

// The slice for the login feature, defining reducers and handling asynchronous actions
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
     // Reducer to handle user logout
    logout: (state) => {
      state.logged = false;
      state.token = '';
      localStorage.removeItem('token');// Clear token from localStorage on logout
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload.access;// Set the token upon successful login
        state.logged = true; // Update logged state to true
        localStorage.setItem('token', action.payload.access); // Optionally store the token in localStorage
        state.status = 'loading';
      })
  },
});

// Export actions for use in UI components
export const { logout } = loginSlice.actions;

// Selector functions to access specific pieces of the login state
export const selectstatus = (state: RootState) => state.login.status;
export const selectlogged = (state: RootState) => state.login.logged;
export const selectToken = (state: RootState) => state.login.token;
export const selectUsername = (state: RootState) => state.login.username;

export default loginSlice.reducer;

