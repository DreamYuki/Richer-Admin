import { FETCH_CRYPTO_DATA } from './cryptoActions';

const initialState = {};

export default function cryptoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CRYPTO_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}