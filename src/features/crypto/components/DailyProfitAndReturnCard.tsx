import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import socket from "../../../utils/socket";
import { updateInitialFunds, updatePositionRisk, updateTotalFees } from "../../../store/binanceData";
import { PositionRisk } from "../../../types/types";

const { Title, Text } = Typography;

function formatDateToUTC3(date: Date) {
  const offset = 3; // UTC+3 时区
  const utcDate = new Date(date.getTime() + offset * 60 * 60 * 1000); // 加上时区偏移
  return utcDate.toISOString().split("T")[0]; // 格式化为 YYYY-MM-DD
}
const DailyProfitAndReturnCard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const initialFunds = useSelector((state: RootState) => state.binanceData?.initialFunds ?? 0);
  const totalFees = useSelector((state: RootState) => state.binanceData?.totalFees ?? 0);
  const positionRisk = useSelector((state: RootState) => state.binanceData?.positionRisk ?? {});
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
  const totalOpenPositionTimes = useSelector((state: RootState) => {
    let yesterday = new Date().setHours(5, 0, 0, 0)
    if (new Date().getHours() < 5) {
      yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).setHours(5, 0, 0, 0)
    }
    const orders = state.binanceData?.orders?.filter(order => Number(order.updateTime) >= yesterday && order.type === "OPEN")
    return orders.length
  })

  // 模拟数据，显示持仓保证金、浮动盈亏、持仓时间、今日总手续费
  const floatingPL = 200; // 示例值

  useEffect(() => {
    socket.on("updateInitialFunds", (data: number) => {
      dispatch(updateInitialFunds(data));
    });
    socket.on("updateTotalFees", (data: number) => {
      dispatch(updateTotalFees(data));
    });
    socket.on("updatePositionRisk", (data: PositionRisk) => {
      dispatch(updatePositionRisk(data));
    });
    return () => {
      socket.off("updateInitialFunds", updateInitialFunds);
      socket.off("updateTotalFees", updateTotalFees);
      socket.off("updatePositionRisk", updatePositionRisk);
    };
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
        <Col span={6}>
          <Statistic title="手续费后盈亏" value={dailyProfit} precision={2} valueStyle={{ color: dailyProfit >= 0 ? "green" : "red" }} suffix="USDT" />
        </Col>
        <Col span={6}>
          <Statistic title="收益率" value={dailyReturnRate} precision={2} valueStyle={{ color: dailyReturnRate >= 0 ? "green" : "red" }} suffix="%" />
        </Col>
        <Col span={6}>
          <Statistic title="持仓保证金" value={positionRisk?.isolatedWallet} precision={6} suffix="USDT" />
        </Col>
        <Col span={6}>
          <Statistic
            title="浮动盈亏"
            value={positionRisk?.unRealizedProfit}
            precision={2}
            valueStyle={{ color: floatingPL >= 0 ? "green" : "red" }}
            suffix="USDT"
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={6}>
          <Statistic title="手续费" value={totalFees} precision={6} suffix="USDT" />
        </Col>
        <Col span={6}>
          <Statistic title="日开仓次数" value={totalOpenPositionTimes} precision={0} />
        </Col>
        <Col span={12}>
          <Statistic
            title="持仓时间"
            value={
              positionRisk.updateTime > 0
                ? Math.floor((Date.now() - positionRisk.updateTime) / (1000 * 60 * 60)) +
                  "小时 " +
                  Math.floor(((Date.now() - positionRisk.updateTime) % (1000 * 60 * 60)) / (1000 * 60)) +
                  "分钟"
                : 0
            }
          />
        </Col>
      </Row>
    </Card>
  );
};

export default DailyProfitAndReturnCard;
