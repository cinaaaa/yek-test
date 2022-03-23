import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  filteredData: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFilteredtData: (state, action) => {
      state.filteredData = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  setData, 
  setFilteredtData
} = dataSlice.actions;

export default dataSlice.reducer;