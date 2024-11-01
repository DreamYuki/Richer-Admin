type WeeklyReturnsData = {
  week: string;
  returns: number;
};

type StrategyData = {
  key: string;
  name: string;
  type: string;
  status: string;
};

type DailyPerformanceData = {
  date: string;
  value: number;
};

class WebSocketService {
  public socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }

  connect(onMessage: (data: any) => void) {
    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
}

export type { WeeklyReturnsData, StrategyData, DailyPerformanceData };
export default WebSocketService;
