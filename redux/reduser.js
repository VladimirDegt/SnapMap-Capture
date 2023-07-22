import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialstate';

export const sliceReducer = createSlice({
  name: 'native',
  initialState: initialState,
  reducers: {
    operation: (state, action) => {
      return state;
    },
  },
});

export const rootReducer = sliceReducer.reducer;
export const { operation } = sliceReducer.actions;
