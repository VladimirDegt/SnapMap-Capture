import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialstate';

export const sliceReducer = createSlice({
  name: 'native',
  initialState: initialState,
  reducers: {
    findName: (state, action) => {
      return state;
    },
  },
});

export const rootReducer = sliceReducer.reducer;
export const { findName } = sliceReducer.actions;
