import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMenu } from './MenuAPI';

export interface menuState {
  items: [];
  status: 'idle' | 'loading' | 'failed';
  error: string | null; // Add error field to store potential error messages
}

const initialState: menuState = {
  items: [],
  status: 'idle',
  error: null,
};

export const menuAsync = createAsyncThunk(
  'menu/menu',
  async () => {
    const response = await fetchMenu();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(menuAsync.pending, (state) => {
        state.status = 'loading';
      })
  },
  
});


export default menuSlice.reducer;

