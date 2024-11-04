import React, { useEffect, useRef, useState } from "react";
import { Card } from "antd";
import { Line } from "@ant-design/plots";
import { useSelector, useDispatch } from "react-redux";
import { initialBalanceData, updateBalanceData } from "../../../store/binanceData";
import { AppDispatch, RootState } from "../../../store";
import socket from "../../../utils/socket";
import useResizeCanvas from "../../../hooks/useResizeCanvas";
import { Balance } from "../../../types/types";
import { throttle } from "../../../utils/throttle";

interface DailyFundsChartProps {
  style?: React.CSSProperties; // 添加 style 属性到组件的 props
}

const DailyFundsChart: React.FC<DailyFundsChartProps> = ({ style }) => {
  const dispatch: AppDispatch = useDispatch();
  const balanceData = useSelector(
    (state: RootState) => state.binanceData?.accountBalance ?? [],
    (prev, next) => prev.length === next.length && prev[prev.length - 1] === next[next.length - 1]
  );
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48); // 传入左右和上下的 padding 以及 title 高度

  useEffect(() => {
    socket.on("requestInitialBalance", (data: Balance[]) => {
      dispatch(initialBalanceData(data));
    });
    socket.emit("requestData", { eventType: "requestInitialBalance", payload: {} });
  }, []);

  useEffect(() => {
    const throttledUpdateBalanceData = throttle((data: Balance) => {
      dispatch(updateBalanceData(data));
    }, 1000); // 每秒最多更新一次

    socket.on("accountBalance", throttledUpdateBalanceData);

    return () => {
      socket.off("accountBalance");
    };
  }, [dispatch]);

  const lineConfig = {
    data: balanceData?.map((item) => ({
      date: new Date(parseFloat(item?.updateTime)),
      value: parseFloat(item?.availableBalance) + parseFloat(item?.isolatedWallet),
    })),
    xField: "date",
    yField: "value",
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    autoFit: false, // 禁用自动适应以防止默认高度问题
    width: canvasSize.width, // 使用 Hook 返回的动态宽度
    height: canvasSize.height, // 使用 Hook 返回的动态高度
  };

  // Memoized Line chart component
  const MemoizedLineChart = React.memo(() => <Line {...lineConfig} style={{ height: "100%", display: "flex" }} />);

  return (
    <Card
      title={
        <div>
          今日资金走势
          <span style={{ fontSize: "12px", color: "#888", marginLeft: "8px" }}>（每日5:00结算）</span>
        </div>
      }
      ref={containerRef}
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
      <MemoizedLineChart />
    </Card>
  );
};

export default DailyFundsChart;
