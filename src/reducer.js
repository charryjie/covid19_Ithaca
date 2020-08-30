import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'update',
  initialState: {
    value: -1,
  },
  reducers: {
    updateByKey: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateByKey } = slice.actions;
export const selectedIdx = state => state.update.value;
export default slice.reducer;