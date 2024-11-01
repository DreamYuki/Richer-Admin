import { createStore, combineReducers } from 'redux';
import cryptoReducer from '../features/crypto/redux/cryptoReducer';

const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

const store = createStore(rootReducer);

export default store;