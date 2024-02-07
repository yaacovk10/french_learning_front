// // src/features/exercise/ExerciseSlice.ts
// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { fetchLessonContent } from './LessonContentAPI';

// // Define a type for the exercise item
// export interface ExerciseItem {
//   id: number;
//   word_hebrew: string;
//   photoUrl: string; // Assuming each exercise item has a URL to a photo
// }

// // Define the initial state type
// interface ExerciseState {
//   content: ExerciseItem[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: ExerciseState = {
//   content: [],
//   status: 'idle',
//   error: null,
// };

// // Assume a function to fetch exercise content from an API
// const fetchExerciseContentFromAPI = async (exerciseId: number): Promise<ExerciseItem[]> => {
//   const response = await axios.get(`/api/exercises/${exerciseId}`);
//   return response.data; // Adjust based on your API response structure
// };

// // Create the thunk for fetching exercise content
// export const fetchExerciseContent = createAsyncThunk(
//   'exercise/fetchContent',
//   async (exerciseId: number, { rejectWithValue }) => {
//     try {
//       const content = await fetchExerciseContentFromAPI(exerciseId);
//       return content;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Create the slice
// export const exerciseSlice = createSlice({
//   name: 'exercise',
//   initialState,
//   reducers: {
//     // Define reducers if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchExerciseContent.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchExerciseContent.fulfilled, (state, action: PayloadAction<ExerciseItem[]>) => {
//         state.status = 'succeeded';
//         state.content = action.payload;
//       })
//       .addCase(fetchExerciseContent.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload as string;
//       });
//   },
// });

// export default exerciseSlice.reducer;
