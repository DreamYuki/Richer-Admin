import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import socket from "../../../utils/socket";
import { updateInitialFunds } from "../../../store/binanceData";

const { Title, Text } = Typography;

function formatDateToUTC3(date: Date) {
  const offset = 3; // UTC+3 时区
  const utcDate = new Date(date.getTime() + offset * 60 * 60 * 1000); // 加上时区偏移
  return utcDate.toISOString().split("T")[0]; // 格式化为 YYYY-MM-DD
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
  const balanceData = useSelector(
    (state: RootState) => state.binanceData?.accountBalance ?? [],
    (prev, next) => prev.length === next.length && prev[prev.length - 1] === next[next.length - 1]
  );

  // 模拟数据，显示持仓保证金、浮动盈亏、持仓时间、今日总手续费
  const positionMargin = 5000; // 示例值
  const floatingPL = 200; // 示例值
  const positionTime = "3h 45m"; // 示例值
  const totalFees = 50; // 示例值

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
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="今日盈亏" value={dailyProfit} precision={2} valueStyle={{ color: dailyProfit >= 0 ? "green" : "red" }} suffix="USDT" />
        </Col>
        <Col span={12}>
          <Statistic title="收益率" value={dailyReturnRate} precision={2} valueStyle={{ color: dailyReturnRate >= 0 ? "green" : "red" }} suffix="%" />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <Statistic title="持仓保证金" value={positionMargin} precision={2} suffix="USDT" />
        </Col>
        <Col span={12}>
          <Statistic title="浮动盈亏" value={floatingPL} precision={2} valueStyle={{ color: floatingPL >= 0 ? "green" : "red" }} suffix="USDT" />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <Statistic title="持仓时间" value={positionTime} />
        </Col>
        <Col span={12}>
          <Statistic title="今日总手续费" value={totalFees} precision={2} suffix="USDT" />
        </Col>
      </Row>
    </Card>
  );
};

export default DailyProfitAndReturnCard;
