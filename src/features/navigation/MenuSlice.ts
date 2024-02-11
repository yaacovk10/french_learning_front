import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMenu } from './MenuAPI';
import { RootState } from '../../app/store';

// Defines the structure for each menu item
interface MenuItem {
  id: number;
  name_english: string;
  name_hebrew: string;
  name_french: string;
}

// Type definition for the menu state within the Redux store
export interface menuState {
  items: MenuItem[];// Array of menu items
  status: 'idle' | 'loading' | 'failed';// Loading status indicator
  error: string | null; // Field for storing error messages, if any
}

// Initial state for the menu slice
const initialState: menuState = {
  items: [],
  status: 'idle',
  error: null,
};

// Asynchronous thunk for fetching the menu from the backend
export const menuAsync = createAsyncThunk(
  'menu/fetchMenu',
  async () => {
    try {
      const response = await fetchMenu(); // Attempt to fetch menu data
      return response; // Return fetched data to be handled by the reducer
    } catch (error) {
      throw error; // Propagate any errors for handling by extraReducers
    }
  }
);


// The slice for handling menu-related state and actions
export const menuSlice = createSlice({
  name: 'menu', // Name of this slice
  initialState,
  reducers: {
    increment: (state) => {
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(menuAsync.pending, (state) => {
        state.status = 'loading'; // Set status to loading when fetch starts
      })
      .addCase(menuAsync.fulfilled, (state, action) => {
        state.status = 'idle'; // Reset status when fetch is successful
        state.items = action.payload; // Update items with fetched data
      })
      .addCase(menuAsync.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed on error
        state.error = action.error.message ?? "Unknown error"; // Store error message
      });
  },
});

// Selector function to access menu items from the state
export const selectMenu = (state: RootState) => state.menu.items;

export default menuSlice.reducer;

