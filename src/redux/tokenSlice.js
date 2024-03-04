import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'jwToken',
  initialState: {
    token: '',
    expire: '',
    username: ''
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setExpire(state, action) {
      state.expire = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    }
  }
});

export const { setToken, setExpire, setUsername } = tokenSlice.actions;
export default tokenSlice.reducer;
