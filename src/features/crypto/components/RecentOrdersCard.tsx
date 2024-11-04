import React, { useEffect } from "react";
import { Card, Table, Tag } from "antd";
import "./RecentOrdersCard.less";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Order } from "../../../types/types";
import { setOrders } from "../../../store/binanceData";
import socket from "../../../utils/socket";
import useResizeCanvas from "../../../hooks/useResizeCanvas";

export enum OrderStatus {
  NEW = "NEW", //新建订单
  PARTIALLY_FILLED = "PARTIALLY_FILLED", // 部分成交
  FILLED = "FILLED", // 全部成交
  CANCELED = "CANCELED", // 已撤销
  REJECTED = "REJECTED", // 订单被拒绝
  EXPIRED = "EXPIRED", // 订单过期(根据timeInForce参数规则)
}

const RecentOrdersCard: React.FC = () => {
  const dispatch = useDispatch();
  const recentOrders = useSelector((state: RootState) => state.binanceData.orders);
  const { containerRef, canvasSize } = useResizeCanvas(10, 10, 48);
  const handleOrdersUpdate = (orders: Order[]) => {
    dispatch(setOrders(orders));
  };
  useEffect(() => {
    socket.on("ordersUpdate", handleOrdersUpdate);
    socket.emit("requestData", { eventType: "requestOrders", payload: {} });
    return () => {
      socket.off("ordersUpdate", handleOrdersUpdate);
    };
  }, []);
  useEffect(() => {
    socket.on("ordersUpdate", handleOrdersUpdate);
    // 清理
    return () => {
      socket.off("ordersUpdate", handleOrdersUpdate);
    };
  }, [dispatch]);

  // 表格列配置
  const columns = [
    {
      title: "交易方向",
      dataIndex: "direction",
      key: "direction",
      render: (text: string) => {
        const color = text === "LONG" ? "green" : "red";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "交易类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "交易状态",
      dataIndex: "status",
      key: "status",
      render: (status: OrderStatus, record: any) => {
        let color = "default"; // 默认灰色圆点
        let label = "未知";

        switch (status) {
          case OrderStatus.CANCELED:
            color = "default";
            label = "已取消";
            break;
          case OrderStatus.EXPIRED:
            color = "default";
            label = "已过期";
            break;
          case OrderStatus.REJECTED:
            color = "error";
            label = "已拒绝";
            break;
          case OrderStatus.FILLED:
            if (record.type === "CLOSE") {
              color = record.profit ? "success" : "error";
              label = record.profit ? "已盈利" : "已亏损";
            } else if (record.type === "FORCECLOSE") {
              color = "error";
              label = "爆仓";
            } else {
              color = "success";
              label = "完全成交";
            }
            break;
          case OrderStatus.PARTIALLY_FILLED:
            color = "warning";
            label = "部分成交";
            break;
          case OrderStatus.NEW:
            color = "processing";
            label = "挂单中";
            break;
          default:
            color = "default";
            label = "未知";
            break;
        }
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: "策略名称",
      dataIndex: "strategyName",
      key: "strategyName",
    },
    {
      title: "收益",
      dataIndex: "profitLoss",
      key: "profitLoss",
      render: (profitLoss: number, record: any) => {
        if (record.type !== "CLOSE" && record.type !== "FORCECLOSE") {
          return <span>—</span>; // 非平仓订单不显示收益
        }
        const color = profitLoss >= 0 ? "green" : "red";
        return (
          <div>
            <span style={{ color }}>{profitLoss >= 0 ? `+${profitLoss.toFixed(5)} USDT` : `${profitLoss.toFixed(5)} USDT`}</span>
            <br />
            <span style={{ color }}>{record.roi}</span>
          </div>
        );
      },
    },
    {
      title: "时间",
      dataIndex: "updateTime",
      key: "updateTime",
      render: (timestamp: string) => {
        const date = new Date(parseInt(timestamp, 10));
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(
          2,
          "0"
        )}`;

        return (
          <div>
            <span>{formattedDate}</span>
            <br />
            <span>{formattedTime}</span>
          </div>
        );
      },
    },
  ];
  return (
    <Card
      title={
        <div>
          最近订单
          <span style={{ fontSize: "12px", color: "#888", marginLeft: "8px" }}>（近7日订单）</span>
        </div>
      }
      ref={containerRef}
      style={{ height: "100%" }}
    >
      <Table
        dataSource={recentOrders}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ y: canvasSize.height * 0.8 }} // 控制表格高度
      />
    </Card>
  );
};

export default RecentOrdersCard;
