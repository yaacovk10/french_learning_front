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
    try {
      const response = await fetchMenu();
      return response;
    } catch (error) {
      throw error; // Throw the error to be caught by Redux Toolkit's rejected action
    }
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
      .addCase(menuAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(menuAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? "Unknown error"; // Use default message if error message is undefined
      });
  },
});


export default menuSlice.reducer;

