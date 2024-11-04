export interface CryptoData {
  id: string;
  name: string;
  price: number;
}

export type DailyReturnsData = {
  date: string;
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
  id: number;
  availableBalance: string;
  allTransfer: string;
  allIncome: string;
  isolatedWallet: string;
  updateTime: string;
}

export interface BinanceDataState {
  initialFunds: number;
  accountBalance: Balance[];
  positionRisk: PositionRisk;
  klineData: KlineDataObj[];
  orders: Order[];
  dailyReturns: DailyReturnsData[];
}

export interface Order {
  key: string;
  direction: string;
  type: string;
  status: string;
  profit: boolean;
  strategyName: string;
  profitLoss: number;
  roi: string;
  updateTime: string;
}

export interface PositionRisk {
  symbol: string; // 交易对
  positionAmt: string; // 头寸数量，符号代表多空方向，正数为多，负数为空
  entryPrice: string; // 开仓均价
  breakEvenPrice: string; // 盈亏平衡价
  markPrice: string; // 当前标记价格
  unRealizedProfit: string; // 持仓未实现盈亏
  liquidationPrice: string; // 参考强平价格
  leverage: string; // 当前杠杆倍数
  maxNotionalValue: string; // 当前杠杆倍数允许的名义价值上限
  marginType: 'cross' | 'isolated'; // 逐仓模式或全仓模式
  isolatedMargin: string; // 逐仓保证金
  isAutoAddMargin: string; // 是否自动添加保证金
  positionSide: 'LONG' | 'SHORT' | 'BOTH'; // 持仓方向
  notional: string; // 持仓名义价值
  isolatedWallet: string; // 逐仓钱包余额
  updateTime: number; // 更新时间（时间戳）
}