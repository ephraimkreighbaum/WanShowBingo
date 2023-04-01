const fs = require('fs');
const https = require('https');
const cors = require('cors');
const { Server } = require('socket.io');

const privateKey = fs.readFileSync('/your/folder/here/ws.example.com/key.pem', 'utf8');
const certificate = fs.readFileSync('/your/folder/here/ws.example.com/crt.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials);
const port = 3000;

const io = new Server(httpsServer, {
  cors: {
    origin: 'https://domain.tld',
    methods: ['GET', 'POST'],
  },
});

let liveUsers = 0;

io.on('connection', (socket) => {
  liveUsers++;
  io.sockets.emit('liveUsers', { liveUsers });

  socket.on('disconnect', () => {
    liveUsers--;
    io.sockets.emit('liveUsers', { liveUsers });
  });
});

httpsServer.listen(port, () => {
  console.log(`Socket.io server running on port ${port}`);
});