import { createSlice } from '@reduxjs/toolkit';
import { sortByDate } from '../utils';

const initialState = {
  data: [],
  sortedData: [],
  filteredData: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.sortedData = sortByDate(action.payload)
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setData,
  setFilteredData,
} = dataSlice.actions;

export default dataSlice.reducer;