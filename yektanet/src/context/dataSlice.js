import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setData } = dataSlice.actions;

export default dataSlice.reducer;