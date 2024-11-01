import { useEffect, useState } from 'react';

const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => setData(event.data);
    return () => ws.close();
  }, [url]);

  return data;
};

export default useWebSocket;