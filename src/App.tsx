import React from "react";
import { Provider } from "react-redux";
import CryptoMonitoringPage from "./features/crypto/pages/CryptoMonitoringPage";
import { store } from "./store";

const App = () => (
  <Provider store={store}>
    <div className="App">
      <CryptoMonitoringPage />
    </div>
  </Provider>
);

export default App;
