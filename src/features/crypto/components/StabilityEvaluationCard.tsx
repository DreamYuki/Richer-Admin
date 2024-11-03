import React, { useEffect } from "react";
import { Card } from "antd";
import { Radar } from "@ant-design/plots";
import useResizeCanvas from "../../../hooks/useResizeCanvas";

const StabilityEvaluationCard: React.FC = () => {
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48);

  useEffect(() => {
    // 当 canvasSize 改变时触发重新渲染或更新图表宽高
    // 如果图表引用支持 ref，可通过 ref.current.update() 调用刷新图表
    console.log(canvasSize.width);
    console.log(canvasSize.height);
  }, [canvasSize]);

  const data = [
    { item: "Hit Rate", type: "real", score: 40 }, // 日命中率
    { item: "Hit Rate", type: "mock", score: 60.36 }, // 日命中率
    { item: "Trigger Rate", type: "real", score: 75 }, // 触发成功率
    { item: "Trigger Rate", type: "mock", score: 70 }, // 触发成功率
    { item: "Win Rate", type: "real", score: 80 }, // 总胜率
    { item: "Win Rate", type: "mock", score: 78 }, // 总胜率
    { item: "Long Win", type: "real", score: 68 }, // 做多胜率
    { item: "Long Win", type: "mock", score: 66 }, // 做多胜率
    { item: "Short Win", type: "real", score: 65 }, // 做空胜率
    { item: "Short Win", type: "mock", score: 63 }, // 做空胜率
    { item: "Net Rel.", type: "real", score: 85 }, // 网络可靠度
    { item: "Net Rel.", type: "mock", score: 82 }, // 网络可靠度
    { item: "Avg Yield", type: "real", score: 72 }, // 平均每个周期收益率
    { item: "Avg Yield", type: "mock", score: 68 }, // 平均每个周期收益率
    { item: "Stop Loss", type: "real", score: 88 }, // 强平止损拦截率
    { item: "Stop Loss", type: "mock", score: 95 }, // 强平止损拦截率
    { item: "No Timeout", type: "real", score: 56 }, // 未超时平仓率
    { item: "No Timeout", type: "mock", score: 44 }, // 未超时平仓率
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
    // width: canvasSize.width,
    // height: canvasSize.height,
    width: 500,
    height: 380,
  };

  return (
    <Card
      title="稳定性评估"
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
        <Radar {...radarConfig} />
      </div>
    </Card>
  );
};

export default React.memo(StabilityEvaluationCard);
