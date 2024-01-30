import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/counter/loginSlice';
import MenuReducer from '../features/counter/MenuSlice';
import lessonContentReducer  from '../features/counter/LessonContentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login : loginReducer,
    menu : MenuReducer,
    lessonContent: lessonContentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
