import React from "react";
import { Card, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const { Title, Text } = Typography;

const DailyProfitAndReturnCard: React.FC = () => {
  // 从 Redux store 获取数据
  const dailyProfit = useSelector((state: RootState) => state.binanceData?.accountBalance?.[state.binanceData?.accountBalance?.length].allIncome ?? 0);
  const dailyReturnRate = useSelector((state: RootState) => {
    const accountBalance = state.binanceData?.accountBalance;
    if (!accountBalance || accountBalance.length === 0) return 0; // 确保有数据
  
    const lastEntry = accountBalance[accountBalance.length - 1];
    const { allIncome, initialFunds } = lastEntry;
  
    // 确保 initialFunds 不为 0，并且 allIncome 存在
    if (initialFunds && allIncome !== undefined) {
      return allIncome / initialFunds;
    }
  
    return 0; // 默认返回值，避免 NaN
  });
  console.log(dailyReturnRate);
  

  return (
    <Card
      title="今日盈亏收益"
      style={{
        height: "100%",
        boxSizing: "border-box", // 确保内边距不增加组件的高度
        overflow: "hidden", // 确保内容不溢出
      }}
      styles={{
        body: {
          padding: "12px", // 控制卡片主体部分的内边距
        },
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Title level={2} style={{ margin: 0, color: dailyProfit >= 0 ? "green" : "red" }}>
          {dailyProfit >= 0 ? `+${dailyProfit.toFixed(2)} USD` : `${dailyProfit.toFixed(2)} USD`}
        </Title>
        <Text style={{ color: dailyReturnRate >= 0 ? "green" : "red" }}>
          {dailyReturnRate >= 0 ? `+${dailyReturnRate.toFixed(2)}%` : `${dailyReturnRate.toFixed(2)}%`}
        </Text>
      </div>
    </Card>
  );
};

export default DailyProfitAndReturnCard;
