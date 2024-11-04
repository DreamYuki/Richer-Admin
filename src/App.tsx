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
            <Sider width={200} className="site-layout-background">
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
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
