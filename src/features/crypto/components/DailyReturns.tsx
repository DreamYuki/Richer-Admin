import React, { useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import { Column, Line } from "@ant-design/plots";
import socket from "../../../utils/socket"; // 引入共享的 WebSocket 实例
import { DailyReturnsData } from "../../../types/types";
import useResizeCanvas from "../../../hooks/useResizeCanvas";

const DailyReturns: React.FC = () => {
  const [DailyReturns, setDailyReturns] = useState<DailyReturnsData[]>([]);
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48); // 传入左右和上下的 padding 以及 title 高度

  useEffect(() => {
    // 监听 WebSocket 事件并更新状态
    const handleDataUpdate = (receivedData: { type: string; data: DailyReturnsData[] }) => {
      if (receivedData.type === "DailyReturns") {
        setDailyReturns(receivedData.data);
      }
    };
    socket.on("DailyReturnsUpdate", handleDataUpdate);
    // 清理连接以防止内存泄漏
    return () => {
      socket.off("DailyReturnsUpdate", handleDataUpdate);
    };
  }, []);

  const config = useMemo(
    () => ({
      data: DailyReturns,
      xField: "date",
      yField: "returns",
      color: ({ returns }: { returns: number }) => (returns >= 0 ? "#52c41a" : "#ff4d4f"),
      label: {
        position: "top",
        style: {
          fill: "#000",
          fontSize: 12,
          fontWeight: "bold",
        },
        formatter: (datum: { returns: number }) => `${datum.returns.toFixed(1)}%`,
      },
      tooltip: {
        formatter: (datum: { week: string; returns: number }) => {
          return { name: "收益率", value: `${datum.returns}%` };
        },
      },
      columnStyle: {
        width: 30,
      },
      autoFit: false,
      width: canvasSize.width,
      height: canvasSize.height,
    }),
    [DailyReturns, canvasSize]
  ); // 仅在依赖项变化时重新生成 config

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
      <Column {...config} style={{ height: "100px" }} />
    </Card>
  );
};

export default DailyReturns;
