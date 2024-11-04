import React, { useEffect, useRef, useState } from "react";
import { Card } from "antd";
import { Column, Stock } from "@ant-design/plots";
import socket from "../../../utils/socket";
import useResizeCanvas from "../../../hooks/useResizeCanvas";
import { KlineDataObj } from "../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setKlineData } from "../../../store/binanceData";

interface RealTimePriceChartProps {
  style?: React.CSSProperties;
}

const CHART_MAP: { [key: string]: any } = {};

const RealTimePriceChart: React.FC<RealTimePriceChartProps> = ({ style }) => {
  const dispatch = useDispatch()
  const klineData = useSelector((state: RootState) => state.binanceData.klineData)
  const dataRef = useRef<KlineDataObj[]>([]);
  const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48);

  useEffect(() => {
    // 监听后端的 K 线数据更新
    socket.on("klineUpdate", (data: KlineDataObj[]) => {
      dispatch(setKlineData(data))
    });
    return () => {
      socket.off("klineUpdate");
    };
  }, [dispatch]);

  // 静态的买卖打点数据
  const mockTradePoints = [
    { time: "10:30", type: "buy", price: 105 },
    { time: "11:00", type: "sell", price: 110 },
    { time: "11:45", type: "buy", price: 108 },
    { time: "12:15", type: "sell", price: 115 },
  ];

  const showTooltip = (data: KlineDataObj) => {
    const { stock, column } = CHART_MAP;
    if (stock && column && data) {
      stock.emit("tooltip:show", {
        data: { data: { x: new Date(data.openTime).toLocaleTimeString() } },
      });
      column.emit("tooltip:show", {
        data: { data },
      });
    }
  };

  const hideTooltip = () => {
    const { stock, column } = CHART_MAP;
    stock.emit("tooltip:hide");
    column.emit("tooltip:hide");
  };

  const setTooltipPosition = (evt: any, chart: any) => {
    const { x } = evt;
    const { layout } = chart.getView();
    const percent = x / layout.width;
    const index = Math.floor(percent * dataRef.current.length);

    // 确保索引在数据范围内
    if (index >= 0 && index < dataRef.current.length) {
      const data = dataRef.current[index];
      if (data) {
        showTooltip(data);
      }
    }
  };

  const stockConfig = {
    data: klineData.map((item) => {
      return {
        date: new Date(item.openTime),
        open: parseFloat(item.openPrice),
        close: parseFloat(item.closePrice),
        high: parseFloat(item.highPrice),
        low: parseFloat(item.lowPrice),
        upperBand: item.bollingerBand?.upperBand,
        middleBand: item.bollingerBand?.middleBand,
        lowerBand: item.bollingerBand?.lowerBand,
      }
    }),
    xField: "date",
    yField: ["open", "close", "high", "low"],
    seriesField: "type", // 用于区分不同线条
    fallingFill: "#ef5350",
    risingFill: "#26a69a",
    axis: {
      y: { labelFormatter: '~s' },
    },
    tooltip: {
      showMarkers: true,
    },
    autoFit: false,
    width: canvasSize.width,
    height: canvasSize.height * (2 / 3), // 上半部分为K线图
  };

  const volumeConfig = {
    data: klineData.map((item) => {
      const isRising = parseFloat(item.closePrice) >= parseFloat(item.openPrice);
      return {
        date: new Date(item.openTime),
        volume: parseFloat(item.volume),
        color: isRising ? "#26a69a" : "#ef5350", // 设置颜色，根据涨跌改变
      };
    }),
    legend: false, // 移除图例
    xField: "date",
    yField: "volume",
    colorField: "color",
    tooltip: {
      title: 'date', // 使用字段 'date' 作为 tooltip 标题
      items: [{ channel: 'y' }], // 配置 y 轴数据作为 tooltip 项
    },
    axis: {
      x: { label: null },
    },
    autoFit: false,
    width: canvasSize.width,
    height: canvasSize.height * (1 / 3), // 下半部分为成交量图
  };

  return (
    <Card
      title={
        <div>
          实时价格走势图
          <span style={{ fontSize: "12px", color: "#888", marginLeft: "8px" }}>（BTC/USDT）</span>
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
      <Stock
        {...stockConfig}
        onReady={({ chart }) => {
          CHART_MAP["stock"] = chart;
          chart.on("plot:pointermove", (evt: any) => setTooltipPosition(evt, chart));
          chart.on("plot:pointerout", hideTooltip);
        }}
      />
      <Column
        {...volumeConfig}
        onReady={({ chart }) => {
          CHART_MAP["column"] = chart;
          chart.on("plot:pointermove", (evt: any) => setTooltipPosition(evt, chart));
          chart.on("plot:pointerout", hideTooltip);
        }}
      />
    </Card>
  );
};

export default RealTimePriceChart;
