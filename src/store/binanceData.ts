import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Balance, BinanceDataState, KlineDataObj } from "../types/types";

const initialState: BinanceDataState = {
  initialFunds: 0,
  accountBalance: [],
  klineData: [],
};

const binanceDataSlice = createSlice({
  name: "binanceData",
  initialState,
  reducers: {
    initialBalanceData: (state, action: PayloadAction<Balance[]>) => {
      state.accountBalance = action.payload;
    },
    updateBalanceData: (state, action: PayloadAction<Balance>) => {
      state.accountBalance = [...state.accountBalance, action.payload];
    },
    updateInitialFunds: (state, action: PayloadAction<number>) => {
      state.initialFunds = action.payload;
    },
    updateKlineData: (state, action: PayloadAction<KlineDataObj>) => {
      state.klineData.push(action.payload);
      // 限制 klineData 的长度为 100 以避免无限增长
      if (state.klineData.length > 100) {
        state.klineData.shift();
      }
    },
    setKlineData: (state, action: PayloadAction<KlineDataObj[]>) => {
      state.klineData = action.payload;
    },
  },
});

export const { initialBalanceData, updateBalanceData, updateInitialFunds, updateKlineData, setKlineData } = binanceDataSlice.actions;
export default binanceDataSlice.reducer;
