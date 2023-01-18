import { configureStore } from '@reduxjs/toolkit';
import wordleReducer from '../features/wordle/wordleSlice';

export const store = configureStore({
  reducer: {
    wordle: wordleReducer,
  },
});
