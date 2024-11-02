import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KlineDataObj } from "../types/types";

export interface Balance {
  initialFunds: number
  availableBalance: number;
  allTransfer: number;
  allIncome: number;
  isolatedWallet: number;
  updateTime: number;
}

interface BinanceDataState {
  accountBalance: Balance[];
  klineData: KlineDataObj[];
}

const initialState: BinanceDataState = {
  accountBalance: [],
  klineData: [],
};

const binanceDataSlice = createSlice({
  name: "binanceData",
  initialState,
  reducers: {
    updateBalanceData: (state, action: PayloadAction<Balance>) => {
      state.accountBalance.push(action.payload)
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

export const { updateBalanceData, updateKlineData, setKlineData } = binanceDataSlice.actions;
export default binanceDataSlice.reducer;
