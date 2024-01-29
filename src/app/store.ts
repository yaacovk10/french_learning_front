import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/counter/loginSlice';
import MenuReducer from '../features/counter/MenuSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login : loginReducer,
    menu : MenuReducer
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
