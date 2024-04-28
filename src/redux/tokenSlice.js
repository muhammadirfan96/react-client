import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'jwToken',
  initialState: {
    token: '',
    expire: '',
    username: '',
    role: ''
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
    },
    setRole(state, action) {
      state.role = action.payload;
    }
  }
});

export const { setToken, setExpire, setUsername, setRole } = tokenSlice.actions;
export default tokenSlice.reducer;
