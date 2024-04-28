import { createSlice } from '@reduxjs/toolkit';

const barSlice = createSlice({
  name: 'bar',
  initialState: {
    sidebar: true,
    bottombar: false
  },
  reducers: {
    setSidebar(state) {
      state.sidebar = !state.sidebar;
    },
    setBottombar(state) {
      state.bottombar = !state.bottombar;
    }
  }
});

export const { setSidebar, setBottombar } = barSlice.actions;
export default barSlice.reducer;
