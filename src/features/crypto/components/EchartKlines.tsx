import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Card } from "antd";
import { Column, Stock } from "@ant-design/plots";
import socket from "../../../utils/socket";
import useResizeCanvas from "../../../hooks/useResizeCanvas";
import { KlineDataObj } from "../../../types/types";

interface RealTimePriceChartProps {
  style?: React.CSSProperties;
}

const RealTimePriceChart: React.FC<RealTimePriceChartProps> = ({ style }) => {
  const [klineData, setKlineData] = useState<KlineDataObj[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48);

  useEffect(() => {
    // 初始化 ECharts 实例
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      socket.on("klineUpdate", (data: KlineDataObj[]) => {
        setKlineData(data);
      });

      return () => {
        socket.off("klineUpdate");
      };
    }
  }, []);

  useEffect(() => {
    if (chartRef.current && klineData.length > 0) {
      const myChart = echarts.init(chartRef.current);

      // 准备数据
      const categoryData = klineData.map((item) => new Date(item.openTime).toLocaleTimeString());
      const values = klineData.map((item) => [item.openPrice, item.closePrice, item.lowPrice, item.highPrice]);
      const upperBand = klineData.map((item) => item.bollingerBand?.upperBand ?? null);
      const middleBand = klineData.map((item) => item.bollingerBand?.middleBand ?? null);
      const lowerBand = klineData.map((item) => item.bollingerBand?.lowerBand ?? null);

      const option = {
        // title: {
        //   text: "实时 15 分钟 K 线图",
        //   left: "center",
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          type: "category",
          data: categoryData,
          boundaryGap: true,
          axisLine: { onZero: false },
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        series: [
          {
            type: "candlestick",
            data: values,
            name: "15分K线",
            itemStyle: {
              color: "#26a69a",
              color0: "#ef5350",
              borderColor: "#26a69a",
              borderColor0: "#ef5350",
            },
          },
          {
            name: "上轨",
            type: "line",
            data: upperBand,
            lineStyle: {
              color: "#f5222d",
              width: 1,
              type: "dashed",
            },
          },
          {
            name: "中轨",
            type: "line",
            data: middleBand,
            lineStyle: {
              color: "#faad14",
              width: 1,
              type: "dashed",
            },
          },
          {
            name: "下轨",
            type: "line",
            data: lowerBand,
            lineStyle: {
              color: "#52c41a",
              width: 1,
              type: "dashed",
            },
          },
        ],
      };

      // 更新图表
      myChart.setOption(option);

      // 监听窗口大小调整
      window.addEventListener("resize", () => myChart.resize());

      return () => {
        window.removeEventListener("resize", () => myChart.resize());
        myChart.dispose();
      };
    }
  }, [klineData]);

  return (
    <Card
      title="实时价格走势图"
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
      <div ref={chartRef} style={{ width: canvasSize.width, height: canvasSize.height }}></div>
    </Card>
  );
};

export default RealTimePriceChart;
