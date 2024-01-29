import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMenu } from './MenuAPI';

export interface menuState {
  status: 'idle' | 'loading' | 'failed';
}

const initialState: menuState = {
  status: 'idle'
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

