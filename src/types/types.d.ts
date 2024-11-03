export interface CryptoData {
  id: string;
  name: string;
  price: number;
}

export type DailyReturnsData = {
  week: string;
  returns: number;
};

export interface KlineDataObj {
  openTime: number; // 开盘时间 (时间戳)
  openPrice: string; // 开盘价
  highPrice: string; // 最高价
  lowPrice: string; // 最低价
  closePrice: string; // 收盘价 (当前K线未结束的即为最新价)
  volume: string; // 成交量
  closeTime: number; // 收盘时间 (时间戳)
  quoteAssetVolume: string; // 成交额
  numberOfTrades: number; // 成交笔数
  takerBuyBaseAssetVolume: string; // 主动买入成交量
  takerBuyQuoteAssetVolume: string; // 主动买入成交额
  ignore: string; // 请忽略该参数
  bollingerBand?: BollingerBand; // 布林带
}

export interface BollingerBand {
  date: number; // 时间戳
  upperBand: number; // 上轨
  middleBand: number; // 中轨 (SMA)
  lowerBand: number; // 下轨
}

export interface Balance {
  id: number
  availableBalance: string;
  allTransfer: string;
  allIncome: string;
  isolatedWallet: string;
  updateTime: string;
}

export interface BinanceDataState {
  initialFunds: number;
  accountBalance: Balance[];
  klineData: KlineDataObj[];
}