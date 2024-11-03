import React from "react";
import { Row, Col } from "antd";
import DailyFundsChart from "../components/DailyFundsChart";
import DailyReturns from "../components/DailyReturns";
import StrategyTable from "../components/StrategyTable";
import RealTimePriceChart from "../components/RealTimePriceChart";
import DailyProfitAndReturnCard from "../components/DailyProfitAndReturnCard";

const CryptoMonitoringPage: React.FC = () => {
  // 日交易触发率、日命中率、总胜率、做空胜率、做多胜率、
  // TODO 雷达图：各个策略胜率雷达图
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} style={{ height: "500px" }}>
        <Col span={14} style={{ height: "100%" }}>
          <RealTimePriceChart style={{ height: "100%" }} />
        </Col>
        <Col span={10} style={{ height: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ flex: "0 0 35%", overflow: "hidden" }}>
            <DailyProfitAndReturnCard />
          </div>
          <div style={{ flex: "1 1 65%", overflow: "hidden" }}>
            <DailyFundsChart style={{ height: "100%" }} />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ height: "240px", marginTop: "16px" }}>
        <Col span={24} style={{ height: "100%" }}>
          <DailyReturns />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col span={24}>
          <StrategyTable />
        </Col>
      </Row>
    </div>
  );
};

export default CryptoMonitoringPage;
