import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialstate';

export const sliceReducer = createSlice({
  name: 'native',
  initialState: initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.login = payload.login;
      state.email = payload.email;
    },
  },
});

export const rootReducer = sliceReducer.reducer;
export const { addUser } = sliceReducer.actions;
