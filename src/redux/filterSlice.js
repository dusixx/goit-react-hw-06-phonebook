import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',

  reducers: {
    setFilter: (state, { payload: newValue }) => newValue,
  },
});

export const filterReducer = filterSlice.reducer;
export const filterActions = filterSlice.actions;
