import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notificationAlert',
  initialState: {
    notification: false
  },
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload;
    }
  }
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
