
import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice.js';
import notificationReducer from './notificationSlice.js';
import confirmationReducer from './confirmationSlice.js';

const store = configureStore({
  reducer: {
    jwToken: tokenReducer,
    notificationAlert: notificationReducer,
    confirmationAlert: confirmationReducer
  }
});

export default store;
