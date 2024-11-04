import React, { useEffect } from "react";
import { Card } from "antd";
import PropTypes from "prop-types";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, BollingerSeries, BarSeries, LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { MouseCoordinateX, MouseCoordinateY, CrossHairCursor, CurrentCoordinate } from "react-stockcharts/lib/coordinates";
import { OHLCTooltip, MovingAverageTooltip, BollingerBandTooltip } from "react-stockcharts/lib/tooltip";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { ema, sma, bollingerBand } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setKlineData } from "../../../store/binanceData";
import socket from "../../../utils/socket";

const RealTimePriceChart = ({ width, ratio }: { width: number; ratio: number }) => {
  const dispatch = useDispatch();
  const klineData = useSelector((state: RootState) => state.binanceData.klineData);

  useEffect(() => {
    socket.on("klineUpdate", (data) => {
      dispatch(setKlineData(data));
    });
    return () => {
      socket.off("klineUpdate");
    };
  }, [dispatch]);

  const ema20 = ema()
    .options({ windowSize: 20 })
    .merge((d: { ema20: any }, c: any) => {
      d.ema20 = c;
    })
    .accessor((d: { ema20: any }) => d.ema20)
    .stroke("blue");

  const sma20 = sma()
    .options({ windowSize: 20 })
    .merge((d: { sma20: any }, c: any) => {
      d.sma20 = c;
    })
    .accessor((d: { sma20: any }) => d.sma20);

  const ema50 = ema()
    .options({ windowSize: 50 })
    .merge((d: { ema50: any }, c: any) => {
      d.ema50 = c;
    })
    .accessor((d: { ema50: any }) => d.ema50);

  const bb = bollingerBand()
    .options({ windowSize: 20, sourcePath: "close" })
    .merge((d: { bb: any }, c: any) => {
      d.bb = c;
    })
    .accessor((d: { bb: any }) => d.bb);

  const calculatedData = ema20(sma20(ema50(bb(klineData))));
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d: { date: string | number | Date }) => new Date(d.date));
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

  const start = xAccessor(data[data.length - 1]);
  const end = xAccessor(data[Math.max(0, data.length - 150)]);
  const xExtents = [start, end];

  return (
    <Card title="实时价格走势图" style={{ height: "100%" }}>
      <ChartCanvas
        height={500}
        width={width}
        ratio={ratio}
        margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
        seriesName="Data"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d: { high: any; low: any; bb: { top: any } }) => [d.high, d.low, d.bb && d.bb.top]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />

          <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%Y-%m-%d")} />
          <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />

          <CandlestickSeries />
          <BollingerSeries yAccessor={bb.accessor()} />
          <LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()} />
          <LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()} />
          <LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()} />

          <OHLCTooltip origin={[-40, 0]} />
          <MovingAverageTooltip
            origin={[-38, 15]}
            options={[
              { yAccessor: sma20.accessor(), type: "SMA", stroke: sma20.stroke(), windowSize: 20 },
              { yAccessor: ema20.accessor(), type: "EMA", stroke: ema20.stroke(), windowSize: 20 },
              { yAccessor: ema50.accessor(), type: "EMA", stroke: ema50.stroke(), windowSize: 50 },
            ]}
          />
          <BollingerBandTooltip origin={[-38, 60]} yAccessor={bb.accessor()} />
        </Chart>
        <Chart id={2} yExtents={(d: { volume: any }) => d.volume}>
          <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
          <BarSeries yAccessor={(d: { volume: any }) => d.volume} fill={(d: { close: number; open: number }) => (d.close > d.open ? "#26a69a" : "#ef5350")} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    </Card>
  );
};

RealTimePriceChart.propTypes = {
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
};

export default fitWidth(RealTimePriceChart);
