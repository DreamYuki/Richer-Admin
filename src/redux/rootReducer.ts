import { combineReducers } from 'redux';
import cryptoReducer from '../features/crypto/redux/cryptoReducer';

export default combineReducers({
  crypto: cryptoReducer,
});