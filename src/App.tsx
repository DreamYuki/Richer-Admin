import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import CryptoDashboard from './features/crypto/components/CryptoDashboard';

const App = () => (
  <Provider store={store}>
    <div className='App'>
      <CryptoDashboard />
    </div>
  </Provider>
);

export default App;