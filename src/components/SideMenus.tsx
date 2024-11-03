// components/SideMenus.tsx
import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

export const CryptoSideMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/crypto/monitoring"]}
      style={{ height: "100%" }}
      onClick={({ key }) => navigate(key)}
    >
      <Menu.Item key="/crypto/monitoring">实盘交易监控</Menu.Item>
      <Menu.Item key="/crypto/backtesting">回测交易</Menu.Item>
      <Menu.Item key="/crypto/orders">实盘订单记录</Menu.Item>
    </Menu>
  );
};

export const EquitiesSideMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/equities/monitoring"]}
      style={{ height: "100%" }}
      onClick={({ key }) => navigate(key)}
    >
      <Menu.Item key="/equities/monitoring">实盘交易监控</Menu.Item>
      <Menu.Item key="/equities/backtesting">回测交易</Menu.Item>
      <Menu.Item key="/equities/orders">实盘订单记录</Menu.Item>
    </Menu>
  );
};

export const FuturesSideMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/futures/monitoring"]}
      style={{ height: "100%" }}
      onClick={({ key }) => navigate(key)}
    >
      <Menu.Item key="/futures/monitoring">实盘交易监控</Menu.Item>
      <Menu.Item key="/futures/backtesting">回测交易</Menu.Item>
      <Menu.Item key="/futures/orders">实盘订单记录</Menu.Item>
    </Menu>
  );
};

export const OptionsSideMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/options/monitoring"]}
      style={{ height: "100%" }}
      onClick={({ key }) => navigate(key)}
    >
      <Menu.Item key="/options/monitoring">实盘交易监控</Menu.Item>
      <Menu.Item key="/options/backtesting">回测交易</Menu.Item>
      <Menu.Item key="/options/orders">实盘订单记录</Menu.Item>
    </Menu>
  );
};
