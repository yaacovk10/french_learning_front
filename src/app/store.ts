import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/authentication/loginSlice';
import MenuReducer from '../features/navigation/MenuSlice';
import lessonContentReducer  from '../features/lessons/LessonContentSlice';


export const store = configureStore({
  reducer: {
    login : loginReducer,
    menu : MenuReducer,
    lessonContent: lessonContentReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
