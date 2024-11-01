import React from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/plots';

const data = [
  // 示例数据
  { date: '2024-11-01', value: 1200 },
  { date: '2024-11-02', value: 1350 },
  // 继续添加数据...
];

const DailyPerformance: React.FC = () => {
  const lineConfig = {
    data,
    xField: 'date',
    yField: 'value',
    smooth: true,
    title: { visible: true, text: '每日资金走势' },
  };

  return (
    <Card title="每日资金走势">
      <Line {...lineConfig} />
    </Card>
  );
};

export default DailyPerformance;
