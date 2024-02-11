import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLessonContent } from "./LessonContentAPI";

// Defines the structure for a single lesson content item
export interface LessonContentItem{
    id: number;
    word_english: string,
    word_hebrew: string,
    word_french: string,
    word_key: string,
    lesson: number
}

// Defines the state structure for lesson content
export interface LessonContentState {
    content: LessonContentItem[] ;  // Array of lesson content items
    status: 'idle' | 'loading' | 'failed'; // Loading status
    error: string | null; // Error message, if any
  }
  
  // Initial state of the lesson content slice
  const initialState: LessonContentState = {
    content: [],
    status: 'idle',
    error: null,
  };

// Asynchronous thunk action for fetching lesson content from the server
  export const fetchContent = createAsyncThunk(
    'lessonContent/fetchContent',
  async (lessonId: number) => {
    // Calls the API function to fetch lesson content based on lessonId
    const response = await fetchLessonContent(lessonId);
    return response; // The fetched content is returned as the action payload
  }
);

// Slice for managing lesson content state
export const lessonContentSlice = createSlice({
    name: 'lessonContent',  // Name of the slice
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // Handles the pending state of fetchContent action
        .addCase(fetchContent.pending, (state) => {
          state.status = 'loading';
        })
      // Handles the fulfilled state of fetchContent action
        .addCase(fetchContent.fulfilled, (state, action) => {
          state.status = 'idle';
          state.content = action.payload;// Updates the content with the fetched data
        })
       // Handles the rejected state of fetchContent action
        .addCase(fetchContent.rejected, (state, action) => {
          state.status = 'failed';
          state.error =action.error.message || "an error occurred";
        });
    },
  });
  
  export default lessonContentSlice.reducer;