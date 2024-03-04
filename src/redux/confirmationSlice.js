import { createSlice } from '@reduxjs/toolkit';

const confirmationSlice = createSlice({
  name: 'confirmationAlert',
  initialState: {
    confirmation: false
  },
  reducers: {
    setConfirmation(state, action) {
      state.confirmation = action.payload;
    }
  }
});

export const { setConfirmation } = confirmationSlice.actions;
export default confirmationSlice.reducer;
