import React from 'react';
import { Card, Table } from 'antd';

interface Strategy {
  key: string;
  name: string;
  side: 'LONG' | 'SHORT';
  startDate: number;
  endDate: number;
  totalTimes: number;
  accurateTimes: number;
  takerTimes: number;
  pendingTimes: number;
  winTimes: number;
  lostTimes: number;
  forceWinTimes: number;
  forceLostTimes: number;
  liquidationTimes: number;
  allHoldingTime: number;
  avgHoldingTime: number;
  maximumHoldingTime: number;
  minimumHoldingTime: number;
  totalReturn: number;
  totalReturnVal: number;
  avgReturn: number;
  maximumReturn: number;
  minimumReturn: number;
}

const strategies: Strategy[] = [
  {
    key: '1',
    name: '策略A',
    side: 'LONG',
    startDate: 1633036800000,
    endDate: 1635724800000,
    totalTimes: 50,
    accurateTimes: 35,
    takerTimes: 30,
    pendingTimes: 20,
    winTimes: 25,
    lostTimes: 15,
    forceWinTimes: 5,
    forceLostTimes: 3,
    liquidationTimes: 1,
    allHoldingTime: 5000000,
    avgHoldingTime: 100000,
    maximumHoldingTime: 200000,
    minimumHoldingTime: 50000,
    totalReturn: 12.5,
    totalReturnVal: 5000,
    avgReturn: 0.25,
    maximumReturn: 3.5,
    minimumReturn: -1.2,
  },
  // 可以继续添加策略数据...
];

const columns = [
  { title: '策略名称', dataIndex: 'name', key: 'name' },
  { title: '方向', dataIndex: 'side', key: 'side' },
  { title: '开始日期', dataIndex: 'startDate', key: 'startDate', render: (date: number) => new Date(date).toLocaleDateString() },
  { title: '结束日期', dataIndex: 'endDate', key: 'endDate', render: (date: number) => new Date(date).toLocaleDateString() },
  { title: '总触发次数', dataIndex: 'totalTimes', key: 'totalTimes' },
  { title: '成功次数', dataIndex: 'accurateTimes', key: 'accurateTimes' },
  { title: '吃单成交次数', dataIndex: 'takerTimes', key: 'takerTimes' },
  { title: '挂单成交次数', dataIndex: 'pendingTimes', key: 'pendingTimes' },
  { title: '盈利次数', dataIndex: 'winTimes', key: 'winTimes' },
  { title: '亏损次数', dataIndex: 'lostTimes', key: 'lostTimes' },
  { title: '强制盈利次数', dataIndex: 'forceWinTimes', key: 'forceWinTimes' },
  { title: '强制亏损次数', dataIndex: 'forceLostTimes', key: 'forceLostTimes' },
  { title: '爆仓次数', dataIndex: 'liquidationTimes', key: 'liquidationTimes' },
  { title: '总持仓时间(ms)', dataIndex: 'allHoldingTime', key: 'allHoldingTime' },
  { title: '平均持仓时间(ms)', dataIndex: 'avgHoldingTime', key: 'avgHoldingTime' },
  { title: '最长持仓时间(ms)', dataIndex: 'maximumHoldingTime', key: 'maximumHoldingTime' },
  { title: '最短持仓时间(ms)', dataIndex: 'minimumHoldingTime', key: 'minimumHoldingTime' },
  { title: '总收益率(%)', dataIndex: 'totalReturn', key: 'totalReturn' },
  { title: '总收益额', dataIndex: 'totalReturnVal', key: 'totalReturnVal' },
  { title: '平均每周期收益率(%)', dataIndex: 'avgReturn', key: 'avgReturn' },
  { title: '单次最高收益率(%)', dataIndex: 'maximumReturn', key: 'maximumReturn' },
  { title: '单次最低收益率(%)', dataIndex: 'minimumReturn', key: 'minimumReturn' },
];

const StrategyTable: React.FC = () => {
  return (
    <Card title="策略监控">
      <Table dataSource={strategies} columns={columns} pagination={false} />
    </Card>
  );
};

export default StrategyTable;
