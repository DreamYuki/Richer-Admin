import React from 'react';
import { Row, Col } from 'antd';
import DailyFundsChart from '../components/DailyFundsChart';
import DailyProfitCard from '../components/DailyProfitCard';
import DailyReturnCard from '../components/DailyReturnCard';
import WeeklyReturnCard from '../components/WeeklyReturns';
import StrategyTable from '../components/StrategyTable';

const CryptoMonitoringPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DailyFundsChart />
        </Col>
        <Col span={12}>
          <DailyProfitCard />
        </Col>
        <Col span={12}>
          <DailyReturnCard />
        </Col>
        <Col span={24}>
          <WeeklyReturnCard />
        </Col>
        <Col span={24}>
          <StrategyTable />
        </Col>
      </Row>
    </div>
  );
};

export default CryptoMonitoringPage;
