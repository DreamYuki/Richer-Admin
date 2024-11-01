import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';
import WebSocketService, { WeeklyReturnsData } from '../../../utils/websocketService';

const WeeklyReturns: React.FC = () => {
  const [data, setData] = useState<WeeklyReturnsData[]>([]);

  useEffect(() => {
    const wsService = new WebSocketService('ws://your-websocket-url');
    wsService.connect((receivedData) => {
      if (receivedData.type === 'weeklyReturns') {
        setData(receivedData.data);
      }
    });

    return () => {
      wsService.socket.close();
    };
  }, []);

  const config = {
    data,
    xField: 'week',
    yField: 'returns',
    color: ({ returns }: { returns: number }) => (returns >= 0 ? '#52c41a' : '#ff4d4f'),
    label: {
      position: 'top',
      style: {
        fill: '#000',
        fontSize: 12,
        fontWeight: 'bold',
      },
      formatter: (datum: { returns: number }) => `${datum.returns.toFixed(1)}%`,
    },
    tooltip: {
      formatter: (datum: { week: string; returns: number }) => {
        return { name: '收益率', value: `${datum.returns}%` };
      },
    },
    columnStyle: {
      width: 30,
    },
  };

  return (
    <Card title="每周收益率" style={{ maxWidth: '400px', marginLeft: '0' }}>
      <Column {...config} />
    </Card>
  );
};

export default WeeklyReturns;
