import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import CryptoMonitoringPage from "./features/crypto/pages/CryptoMonitoringPage";

const App = () => (
  <Provider store={store}>
    <div className="App">
      <CryptoMonitoringPage />
    </div>
  </Provider>
);

export default App;
