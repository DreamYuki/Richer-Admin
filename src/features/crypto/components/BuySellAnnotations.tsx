import { Annotate, SvgPathAnnotation } from "react-financial-charts";
import React from "react";

const BuySellAnnotation: React.FC<any> = ({ plotData, xAccessor, xScale  }) => {
  const buyPath = (datum: any) => "M0,-5L5,0L0,5L-5,0Z"; // 定义买入标记路径
  const sellPath = (datum: any) => "M0,5L5,0L0,-5L-5,0Z"; // 定义卖出标记路径

  return (
    <>
      {plotData.map((datum: { type: string; }, index: React.Key | null | undefined) => (
        <SvgPathAnnotation
          key={index}
          className="buy-sell-annotation"
          path={(d) => (d.type === "buy" ? buyPath(d) : sellPath(d))}
          datum={datum}
          x={({ datum }) => xScale(xAccessor(datum))}
          y={({ yScale, datum }) => {
            if (typeof yScale === "function") {
              return yScale(datum.price);
            } else {
              console.error("yScale is not a function");
              return 30; // 返回一个默认值避免崩溃
            }
          }}
          plotData={plotData} // 添加 plotData 属性
          fill={datum.type === "buy" ? "green" : "red"}
          stroke="black"
          pathHeight={10}
          pathWidth={10}
          tooltip={datum.type === "buy" ? "Buy Point" : "Sell Point"}
        />
      ))}
    </>
  );
};

export default BuySellAnnotation;
