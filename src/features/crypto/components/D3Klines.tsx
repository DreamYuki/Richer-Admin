import React, { useEffect, useMemo, useState } from "react";
import { Card } from "antd";

import {
  ChartCanvas,
  Chart,
  BarSeries,
  CandlestickSeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  XAxis,
  YAxis,
  MouseCoordinateX,
  MouseCoordinateY,
  CrossHairCursor,
  withSize,
  withDeviceRatio,
  BollingerSeries,
} from "react-financial-charts";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import socket from "../../../utils/socket";
import useResizeCanvas from "../../../hooks/useResizeCanvas";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setKlineData } from "../../../store/binanceData";
import { bollingerBand } from "react-financial-charts";
import { ema } from "react-financial-charts";
import { discontinuousTimeScaleProviderBuilder } from "react-financial-charts";
import BuySellAnnotations from "./BuySellAnnotations";

// 使用 React.forwardRef 包裹组件
const D3Klines: React.FC = () => {
  const dispatch = useDispatch();
  // const { containerRef, canvasSize } = useResizeCanvas(10, 24, 48);
  const klineData = useSelector((state: RootState) => state.binanceData.klineData);
  // 确保数据格式符合 react-stockcharts 的要求
  const formattedData = useMemo(() => {
    return klineData.map((item) => ({
      date: new Date(item.openTime),
      open: parseFloat(item.openPrice),
      high: parseFloat(item.highPrice),
      low: parseFloat(item.lowPrice),
      close: parseFloat(item.closePrice),
      volume: parseFloat(item.volume),
      bollingerBand: {
        top: item.bollingerBand?.upperBand,
        middle: item.bollingerBand?.middleBand,
        bottom: item.bollingerBand?.lowerBand,
      },
    }));
  }, [klineData]);
  useEffect(() => {
    socket.on("klineUpdate", (data) => {
      dispatch(setKlineData(data));
    });
    return () => {
      socket.off("klineUpdate");
    };
  }, [dispatch]);

  const ema12 = useMemo(() => {
    return ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d: any, c: any) => {
        d.ema12 = c;
      })
      .accessor((d: any) => d.ema12);
  }, []);

  const ema26 = useMemo(() => {
    return ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: any, c: any) => {
        d.ema26 = c;
      })
      .accessor((d: any) => d.ema26);
  }, []);

  const bb = useMemo(() => {
    return bollingerBand()
      .merge((d: any, c: any) => {
        d.bb = c;
      })
      .accessor((d: any) => d.bb);
  }, []);

  // 计算技术指标数据
  const calculatedData = useMemo(() => {
    return bb(ema26(ema12(formattedData)));
  }, [bb, ema12, ema26, formattedData]);

  const xScaleProvider = useMemo(() => {
    return discontinuousTimeScaleProviderBuilder().inputDateAccessor((d: any) => d.date);
  }, []);

  const { data, xScale, xAccessor, displayXAccessor } = useMemo(() => {
    return xScaleProvider(calculatedData);
  }, [calculatedData]);
  const xExtents = useMemo(() => {
    const start = xAccessor(data[data.length - 1]);
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    return [start, end];
  }, [data, xAccessor]);
  const xOffset = 0;
  const height = 400;
  const width = 1250;
  return (
    <Card title="实时价格走势图" style={{ height: "100%" }} className="kline-card">
      <ChartCanvas
        height={height}
        width={width}
        ratio={1}
        margin={{ left: 10, right: 50, top: 10, bottom: 30 }}
        seriesName="Data"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d: any) => [d.high, d.low, d.bb && d.bb.top]} height={height * (2 / 3)} origin={(w: any, h: number) => [xOffset, 0]}>
          <YAxis showGridLines ticks={6} />
          <CandlestickSeries />
          <BollingerSeries yAccessor={(d: any) => d.bollingerBand} />
          <LineSeries yAccessor={ema12.accessor()} strokeStyle={ema12.stroke()} />
          <LineSeries yAccessor={ema26.accessor()} strokeStyle={ema26.stroke()} />
          <MouseCoordinateX displayFormat={timeFormat("%Y-%m-%d")} />
          <MouseCoordinateY displayFormat={format(".2f")} />
          <OHLCTooltip origin={[10, 10]} />
          {/* <BuySellAnnotations plotData={data} xAccessor={xAccessor} xScale={xScale} /> */}
        </Chart>
        <Chart id={2} yExtents={(d: any) => d.volume} height={height * (0.8 / 3)} origin={(w: any, h: number) => [xOffset, 400 * (2 / 3)]}>
          <BarSeries yAccessor={(d: any) => d.volume} />
          <YAxis innerTickSize={0.1} ticks={6} />
          <XAxis showGridLines ticks={10} showDomain />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </Card>
  );
};

export default D3Klines;
