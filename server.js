// server.js
const { createServer } = require('http');
const next = require('next');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = socketIo(server);

  io.on('connection', (socket) => {
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
    });

    socket.on('send_message', (data) => {
      const { roomId } = data;
      socket.to(roomId).emit('receive_message', data);
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Servidor rodando em http://192.168.107.115:${port}`);
  });
});
    