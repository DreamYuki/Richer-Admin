import React, { useState } from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { store } from "./store";
import CryptoMonitoringPage from "./features/crypto/pages/CryptoMonitoringPage";
import EquitiesMonitoringPage from "./features/equities/pages/EquitiesMonitoringPage";
import FuturesMonitoringPage from "./features/futures/pages/FuturesMonitoringPage";
import OptionsMonitoringPage from "./features/options/pages/OptionsMonitoringPage";
import { CryptoSideMenu, EquitiesSideMenu, FuturesSideMenu, OptionsSideMenu } from "./components/SideMenus";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [selectedMarket, setSelectedMarket] = useState("crypto");
  const [collapsed, setCollapsed] = useState(false); // 用于控制侧边栏的折叠状态

  const renderSideMenu = () => {
    switch (selectedMarket) {
      case "crypto":
        return <CryptoSideMenu />;
      case "equities":
        return <EquitiesSideMenu />;
      case "futures":
        return <FuturesSideMenu />;
      case "options":
        return <OptionsSideMenu />;
      default:
        return null;
    }
  };

  return (
    <Provider store={store}>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ color: "#fff" }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["crypto"]}
              onClick={(e) => setSelectedMarket(e.key)}
              items={[
                { key: "crypto", label: "加密货币" },
                { key: "equities", label: "美股 · 正股" },
                { key: "futures", label: "美股 · 期货" },
                { key: "options", label: "美股 · 期权" },
              ]}
            />
          </Header>
          <Layout>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)} // 切换折叠状态
              width={200}
              collapsedWidth={40} // 折叠后的宽度
              className="site-layout-background"
              trigger={null} // 去掉默认的触发按钮以自定义按钮
            >
              {renderSideMenu()}
            </Sider>
            <Layout style={{ padding: "24px" }}>
              <Content>
                <Routes>
                  <Route path="/crypto/monitoring" element={<CryptoMonitoringPage />} />
                  <Route path="/crypto/backtesting" element={<div>Crypto Backtesting</div>} />
                  <Route path="/crypto/orders" element={<div>Crypto Order Records</div>} />
                  <Route path="/equities/monitoring" element={<EquitiesMonitoringPage />} />
                  <Route path="/equities/backtesting" element={<div>Equities Backtesting</div>} />
                  <Route path="/equities/orders" element={<div>Equities Order Records</div>} />
                  <Route path="/futures/monitoring" element={<FuturesMonitoringPage />} />
                  <Route path="/futures/backtesting" element={<div>Futures Backtesting</div>} />
                  <Route path="/futures/orders" element={<div>Futures Order Records</div>} />
                  <Route path="/options/monitoring" element={<OptionsMonitoringPage />} />
                  <Route path="/options/backtesting" element={<div>Options Backtesting</div>} />
                  <Route path="/options/orders" element={<div>Options Order Records</div>} />
                  <Route path="*" element={<Navigate to="/crypto/monitoring" replace />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
          {/* 固定在视口左下角的折叠按钮 */}
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: "fixed",
              bottom: 16,
              left: 16,
              color: "#333", // 灰黑色字体
              cursor: "pointer",
              padding: "8px 12px",
              backgroundColor: "transparent", // 透明背景色
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // 较轻的阴影效果
            }}
          >
            {collapsed ? ">" : "<"} {/* 自定义按钮的内容 */}
          </div>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
