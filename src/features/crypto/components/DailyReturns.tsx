import React, { useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import { Column, Line } from "@ant-design/plots";
import socket from "../../../utils/socket"; // 引入共享的 WebSocket 实例
import { DailyReturnsData } from "../../../types/types";
import useResizeCanvas from "../../../hooks/useResizeCanvas";

// 生成 mock 数据的函数
const generateMockData = (): DailyReturnsData[] => {
  return Array.from({ length: 14 }, (_, index) => ({
    date: `${new Date(`2024-10-${index + 1}`).getMonth() + 1}-${new Date(`2024-10-${index + 1}`).getDate()}`,
    returns: (Math.random() * 10 - 5)/100, // -5% 到 5% 的随机收益率
  }));
};

const DailyReturns: React.FC = () => {
  const [dailyReturns, setDailyReturns] = useState<DailyReturnsData[]>([]);
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48); // 传入左右和上下的 padding 以及 title 高度

  // useEffect(() => {
  //   // 监听 WebSocket 事件并更新状态
  //   const handleDataUpdate = (receivedData: { type: string; data: DailyReturnsData[] }) => {
  //     if (receivedData.type === "DailyReturns") {
  //       setDailyReturns(receivedData.data);
  //     }
  //   };
  //   socket.on("DailyReturnsUpdate", handleDataUpdate);
  //   // 清理连接以防止内存泄漏
  //   return () => {
  //     socket.off("DailyReturnsUpdate", handleDataUpdate);
  //   };
  // }, []);

  useEffect(() => {
    // 使用 mock 数据初始化
    const mockData = generateMockData()
    console.log(mockData);
    
    setDailyReturns(mockData);
    
  }, []);

  const volumeConfig = {
    data: dailyReturns,
    xField: 'date',
    yField: 'returns',
    colorField: ({ returns }: { returns: number }) => (returns >= 0 ? "#52c41a" : "#ff4d4f"),
    legend: false, // 移除图例
    label: {
      text: (d: { returns: number; }) => `${(d.returns * 100).toFixed(1)}%`,
      textBaseline: 'bottom',
    },
    axis: {
      y: {
        labelFormatter: '.0%',
      },
    },
    tooltip: { channel: 'y', valueFormatter: (d: number) => (d * 100).toFixed(2) + "%" },
    autoFit: false,
    width: canvasSize.width,
    height: canvasSize.height, // 下半部分为成交量图
  };

  return (
    <Card
      title="每日收益率"
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
      <Column {...volumeConfig} />
    </Card>
  );
};

export default DailyReturns;
