import { io, Socket } from 'socket.io-client';

// 创建并导出单一的 WebSocket 实例
const socket: Socket = io('http://localhost:3003'); // 替换为你的后端 WebSocket URL

export default socket;