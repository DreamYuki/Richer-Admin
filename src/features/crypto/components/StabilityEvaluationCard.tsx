import React, { useEffect, useRef, useState } from "react";
import { Card } from "antd";
import { Radar } from "@ant-design/plots";
import useResizeCanvas from "../../../hooks/useResizeCanvas";

const StabilityEvaluationCard: React.FC = () => {
  const [chartKey, setChartKey] = useState(0);
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48);
  useEffect(() => {
    // 强制重新渲染雷达图，否则会错位
    setChartKey((prevKey: number) => prevKey + 1);
  }, [canvasSize]);

  const data = [
    { item: "日命中率", type: "实盘", score: 40 },
    { item: "日命中率", type: "回测", score: 60.36 },
    { item: "触发成功率", type: "实盘", score: 75 },
    { item: "触发成功率", type: "回测", score: 70 },
    { item: "总胜率", type: "实盘", score: 80 },
    { item: "总胜率", type: "回测", score: 78 },
    { item: "做多胜率", type: "实盘", score: 68 },
    { item: "做多胜率", type: "回测", score: 66 },
    { item: "做空胜率", type: "实盘", score: 65 },
    { item: "做空胜率", type: "回测", score: 63 },
    { item: "网络可靠度", type: "实盘", score: 85 },
    { item: "网络可靠度", type: "回测", score: 82 },
    { item: "周期收益率", type: "实盘", score: 72 },
    { item: "周期收益率", type: "回测", score: 68 },
    { item: "强平拦截率", type: "实盘", score: 88 },
    { item: "强平拦截率", type: "回测", score: 95 },
    { item: "按时平仓率", type: "实盘", score: 56 },
    { item: "按时平仓率", type: "回测", score: 44 },
  ];

  const radarConfig = {
    data,
    xField: "item",
    yField: "score",
    colorField: "type",
    shapeField: "smooth",
    area: {
      style: {
        fillOpacity: 0.5,
      },
    },
    scale: { x: { padding: 0.5, align: 0 }, y: { tickCount: 5, domainMax: 100 } },
    axis: { x: { grid: true }, y: { zIndex: 1, title: false } },
    style: {
      lineWidth: 2,
    },
    autoFit: true,
    width: canvasSize.width,
    height: canvasSize.height,
  };

  return (
    <Card
      title={
        <div>
          稳定性评估
          <span style={{ fontSize: "12px", color: "#888", marginLeft: "8px" }}>（近30日数据）</span>
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
      <div style={{ display: "block", textAlign: "center" }}>
        <Radar key={chartKey} {...radarConfig} />
      </div>
    </Card>
  );
};

export default React.memo(StabilityEvaluationCard);
