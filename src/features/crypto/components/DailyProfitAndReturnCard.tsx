import React, { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import socket from "../../../utils/socket";
import { updateInitialFunds } from "../../../store/binanceData";

const { Title, Text } = Typography;

function formatDateToUTC3(date: Date ) {
  const offset = 3; // UTC+3 时区
  const utcDate = new Date(date.getTime() + offset * 60 * 60 * 1000); // 加上时区偏移
  return utcDate.toISOString().split('T')[0]; // 格式化为 YYYY-MM-DD
}
const DailyProfitAndReturnCard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const initialFunds = useSelector((state: RootState) => state.binanceData?.initialFunds ?? 0);
  const dailyReturnRate = useSelector((state: RootState) => {
    const accountBalance = state.binanceData?.accountBalance;
    if (!accountBalance || accountBalance.length === 0) return 0; // 确保有数据

    const lastEntry = accountBalance[accountBalance.length - 1];
    if (initialFunds && lastEntry?.allIncome !== undefined) {
      return (100 * parseFloat(lastEntry?.allIncome)) / initialFunds;
    }
    return 0; // 默认返回值，避免 NaN
  });
  const dailyProfit = useSelector((state: RootState) => {
    const accountBalance = state.binanceData?.accountBalance;
    if (!accountBalance || accountBalance.length === 0) return 0; // 确保有数据

    const lastEntry = accountBalance[accountBalance.length - 1];
    if (initialFunds && lastEntry?.allIncome !== undefined) {
      return parseFloat(lastEntry?.allIncome);
    }

    return 0;
  });

  useEffect(() => {
    socket.on("updateInitialFunds", (data: number) => {
      dispatch(updateInitialFunds(data));
    });
  }, [dispatch]);

  return (
    <Card
      title={
        <div>
          今日盈亏收益
          <span style={{ fontSize: "12px", color: "#888", marginLeft: "8px" }}>（{formatDateToUTC3(new Date())}）</span>
        </div>
      }
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
