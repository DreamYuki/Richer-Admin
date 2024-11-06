
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	CandlestickSeries,
	LineSeries,
	BollingerSeries,
	BarSeries,
	AreaSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip, MovingAverageTooltip, BollingerBandTooltip } from "react-stockcharts/lib/tooltip";
import { ema, sma, bollingerBand } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const bbStroke = {
	top: "#964B00",
	middle: "#000000",
	bottom: "#964B00",
};

const bbFill = "#4682B4";
const initialData = [{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},{
  "date":  new Date(),
  "open": 25.436282332605284,
  "high": 25.835021381744056,
  "low": 25.411360259406774,
  "close": 25.710416,
  "volume": 38409100,
  "split": "",
  "dividend": "",
  "absoluteChange": "",
  "percentChange": ""
},];
class CandleStickChartWithBollingerBandOverlay extends React.Component {
  
	render() {
		const ema20 = ema()
			.options({
				windowSize: 20, // optional will default to 10
				sourcePath: "close", // optional will default to close as the source
			})
			.skipUndefined(true) // defaults to true
			.merge((d: { ema20: any; }, c: any) => {d.ema20 = c;}) // Required, if not provided, log a error
			.accessor((d: { ema20: any; }) => d.ema20) // Required, if not provided, log an error during calculation
			.stroke("blue"); // Optional

		const sma20 = sma()
			.options({ windowSize: 20 })
			.merge((d: { sma20: any; }, c: any) => {d.sma20 = c;})
			.accessor((d: { sma20: any; }) => d.sma20);

		const ema50 = ema()
			.options({ windowSize: 50 })
			.merge((d: { ema50: any; }, c: any) => {d.ema50 = c;})
			.accessor((d: { ema50: any; }) => d.ema50);

		const smaVolume50 = sma()
			.options({ windowSize: 20, sourcePath: "volume" })
			.merge((d: { smaVolume50: any; }, c: any) => {d.smaVolume50 = c;})
			.accessor((d: { smaVolume50: any; }) => d.smaVolume50)
			.stroke("#4682B4")
			.fill("#4682B4");

		const bb = bollingerBand()
			.merge((d: { bb: any; }, c: any) => {d.bb = c;})
			.accessor((d: { bb: any; }) => d.bb);

		const calculatedData = ema20(sma20(ema50(smaVolume50(bb(initialData)))));
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor((d: { date: any; }) => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={400}
				width={1250}
				ratio={1}
				margin={{ left: 70, right: 70, top: 10, bottom: 30 }}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1}
					yExtents={[(d: { high: any; low: any; }) => [d.high, d.low], sma20.accessor(), ema20.accessor(), ema50.accessor(), bb.accessor()]}
					padding={{ top: 10, bottom: 20 }}
					onContextMenu={(...rest: any) => { console.log("chart - context menu", rest); }}
				>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={5}
						onDoubleClick={(...rest: any) => { console.log("yAxis - double click", rest); }}
						onContextMenu={(...rest: any) => { console.log("yAxis - context menu", rest); }}
					/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<CandlestickSeries />
					<BollingerSeries yAccessor={(d: { bb: any; }) => d.bb}
						stroke={bbStroke}
						fill={bbFill} />

					<LineSeries yAccessor={sma20.accessor()} stroke={sma20.stroke()}/>
					<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					<LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>
					<CurrentCoordinate yAccessor={sma20.accessor()} fill={sma20.stroke()} />
					<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
					<CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

					<OHLCTooltip origin={[-40, 0]}/>

					<MovingAverageTooltip
						onClick={(e: any) => console.log(e)}
						origin={[-38, 15]}
						options={[
							{
								yAccessor: sma20.accessor(),
								type: sma20.type(),
								stroke: sma20.stroke(),
								windowSize: sma20.options().windowSize,
							},
							{
								yAccessor: ema20.accessor(),
								type: ema20.type(),
								stroke: ema20.stroke(),
								windowSize: ema20.options().windowSize,
							},
							{
								yAccessor: ema50.accessor(),
								type: ema50.type(),
								stroke: ema50.stroke(),
								windowSize: ema50.options().windowSize,
							},
						]}
					/>
					<BollingerBandTooltip
						origin={[-38, 60]}
						yAccessor={(d: { bb: any; }) => d.bb}
						options={bb.options()} />
				</Chart>
				<Chart id={2}
					yExtents={[(d: { volume: any; }) => d.volume, smaVolume50.accessor()]}
					height={150} origin={(w: any, h: number) => [0, h - 150]}
				>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>

					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={(d: { volume: any; }) => d.volume} fill={(d: { close: number; open: number; }) => d.close > d.open ? "#6BA583" : "#FF0000" } />
					<AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()}/>
					<CurrentCoordinate yAccessor={smaVolume50.accessor()} fill={smaVolume50.stroke()} />
					<CurrentCoordinate yAccessor={(d: { volume: any; }) => d.volume} fill="#9B0A47" />
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

// const WrappedCandleStickChart = fitWidth();

export default CandleStickChartWithBollingerBandOverlay;
