let socket: WebSocket | null = null;

export const getSocket = (roomId: string): WebSocket => {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    socket = new WebSocket(`${wsProtocol}://shadow-backend-production.up.railway.app/ws/${roomId}`);
  }
  return socket;
};
