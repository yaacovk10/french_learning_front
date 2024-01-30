import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLessonContent } from "./LessonContentAPI";

export interface LessonContentItem{
    id: number;
    word_english: string,
    word_hebrew: string,
    word_french: string,
    lesson: number
}

export interface LessonContentState {
    content: LessonContentItem[] ;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
  }
  
  const initialState: LessonContentState = {
    content: [],
    status: 'idle',
    error: null,
  };

export const fetchContent = createAsyncThunk(
    'lessonContent/fetchContent',
  async (lessonId: number) => {
    const response = await fetchLessonContent(lessonId);
    return response;
  }
);


export const lessonContentSlice = createSlice({
    name: 'lessonContent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchContent.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchContent.fulfilled, (state, action) => {
          state.status = 'idle';
          state.content = action.payload;
        })
        .addCase(fetchContent.rejected, (state, action) => {
          state.status = 'failed';
          state.error =action.error.message || "an error occurred";
        });
    },
  });
  
  export default lessonContentSlice.reducer;