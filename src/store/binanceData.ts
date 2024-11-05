import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Balance, BinanceDataState, DailyReturnsData, KlineDataObj, Order, PositionRisk } from "../types/types";

const initialState: BinanceDataState = {
  initialFunds: 0,
  totalFees: 0,
  accountBalance: [],
  positionRisk: {
    symbol: "",
    positionAmt: "",
    entryPrice: "",
    breakEvenPrice: "",
    markPrice: "",
    unRealizedProfit: "",
    liquidationPrice: "",
    leverage: "",
    maxNotionalValue: "",
    marginType: "cross",
    isolatedMargin: "",
    isAutoAddMargin: "",
    positionSide: "LONG",
    notional: "",
    isolatedWallet: "",
    updateTime: 0,
  },
  klineData: [],
  orders: [],
  dailyReturns: [],
};

const binanceDataSlice = createSlice({
  name: "binanceData",
  initialState,
  reducers: {
    initialBalanceData: (state, action: PayloadAction<Balance[]>) => {
      state.accountBalance = action.payload;
    },
    updateTotalFees: (state, action: PayloadAction<number>) => {
      state.totalFees = action.payload;
    },
    updateBalanceData: (state, action: PayloadAction<Balance>) => {
      state.accountBalance = [...state.accountBalance, action.payload];
      if (state.accountBalance.length > 1000) {
        state.accountBalance.shift();
      }
    },
    updatePositionRisk: (state, action: PayloadAction<PositionRisk>) => {
      state.positionRisk = action.payload;
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
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setDailyReturns: (state, action: PayloadAction<DailyReturnsData[]>) => {
      state.dailyReturns = action.payload;
    },
  },
});

export const {
  initialBalanceData,
  updateTotalFees,
  updateBalanceData,
  updatePositionRisk,
  updateInitialFunds,
  updateKlineData,
  setKlineData,
  setOrders,
  setDailyReturns,
} = binanceDataSlice.actions;
export default binanceDataSlice.reducer;
