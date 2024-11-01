import React from 'react';
import { Card, Table } from 'antd';

const strategies = [
  { key: '1', name: '策略A', type: '趋势跟踪', status: '运行中' },
  { key: '2', name: '策略B', type: '均值回归', status: '停止' },
  { key: '3', name: '策略C', type: '动量策略', status: '运行中' },
  // 继续添加策略数据...
];

const columns = [
  { title: '策略名称', dataIndex: 'name', key: 'name' },
  { title: '类型', dataIndex: 'type', key: 'type' },
  { title: '状态', dataIndex: 'status', key: 'status' },
];

const StrategyTable: React.FC = () => {
  return (
    <Card title="当前使用的策略">
      <Table dataSource={strategies} columns={columns} pagination={false} />
    </Card>
  );
};

export default StrategyTable;
