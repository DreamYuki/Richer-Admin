import React, { useEffect, useRef, useState } from "react";
import { Card } from "antd";
import { Line } from "@ant-design/plots";
import { useSelector, useDispatch } from "react-redux";
import { Balance, updateBalanceData } from "../../../store/binanceData";
import { RootState } from "../../../store";
import socket from "../../../utils/socket";
import useResizeCanvas from "../../../hooks/useResizeCanvas";

interface DailyFundsChartProps {
  style?: React.CSSProperties; // 添加 style 属性到组件的 props
}

const DailyFundsChart: React.FC<DailyFundsChartProps> = ({ style }) => {
  const dispatch = useDispatch();
  const balanceData = useSelector((state: RootState) => state.binanceData?.accountBalance ?? []);
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48); // 传入左右和上下的 padding 以及 title 高度
  
  useEffect(() => {
    socket.on("accountBalance", (data: Balance) => {
      dispatch(updateBalanceData(data));
    });

    return () => {
      socket.off("accountBalance");
    };
  }, [dispatch]);

  const lineConfig = {
    data: balanceData.map((item) => ({
      date: new Date(item.updateTime).toLocaleDateString(),
      value: item.availableBalance,
    })),
    xField: "date",
    yField: "value",
    smooth: true,
    title: { visible: true, text: "今日资金走势" },
    autoFit: false, // 禁用自动适应以防止默认高度问题
    width: canvasSize.width, // 使用 Hook 返回的动态宽度
    height: canvasSize.height, // 使用 Hook 返回的动态高度
  };

  return (
    <Card
      title="今日资金走势"
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
      <Line {...lineConfig} style={{ height: "100%", display: "flex" }} />
    </Card>
  );
};

export default DailyFundsChart;
