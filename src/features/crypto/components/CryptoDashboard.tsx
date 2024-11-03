import React from "react";
import StrategyTable from "./StrategyTable";
import WeeklyReturns from "./DailyReturns";
import { Row, Col } from "antd";

const CryptoDashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Daily Performance Component */}
        <Col span={24}></Col>

        {/* Weekly Returns Component */}
        <Col span={24}>
          <WeeklyReturns />
        </Col>

        {/* Strategy Table Component */}
        <Col span={24}>
          <StrategyTable />
        </Col>
      </Row>
    </div>
  );
};

export default CryptoDashboard;
