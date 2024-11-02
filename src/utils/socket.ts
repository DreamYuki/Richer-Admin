import { io, Socket } from 'socket.io-client';
import store from '../redux/store';
import { updateBalanceData } from '../store/binanceData';

// 创建并导出单一的 WebSocket 实例
const socket: Socket = io('http://localhost:3003'); // 替换为你的后端 WebSocket URL

socket.on('accountBalance', (data) => {
  console.log('data:', data);
  
  store.dispatch(updateBalanceData(data.data));
});

export default socket;