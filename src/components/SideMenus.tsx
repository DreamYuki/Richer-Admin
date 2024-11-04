import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const createMenuItems = (basePath: string) => [
  { key: `${basePath}/monitoring`, label: "实盘交易监控" },
  { key: `${basePath}/backtesting`, label: "回测交易" },
  { key: `${basePath}/orders`, label: "实盘订单记录" },
];

export const CryptoSideMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["/crypto/monitoring"]}
      style={{ height: "100%" }}
      onClick={({ key }) => navigate(key)}
      items={createMenuItems("/crypto")}
    />
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
      items={createMenuItems("/equities")}
    />
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
      items={createMenuItems("/futures")}
    />
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
      items={createMenuItems("/options")}
    />
  );
};
