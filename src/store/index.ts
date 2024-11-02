import { configureStore } from '@reduxjs/toolkit';
import binanceDataReducer from './binanceData';

export const store = configureStore({
  reducer: {
    binanceData: binanceDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
