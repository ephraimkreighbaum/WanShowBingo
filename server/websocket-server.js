const fs = require('fs');
const https = require('https');
const cors = require('cors');
const { Server } = require('socket.io');

const privateKey = fs.readFileSync('/your/host/here/domain.tld/key.pem', 'utf8');
const certificate = fs.readFileSync('/your/host/here/domain.tld/crt.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials);
const port = 3000;

const io = new Server(httpsServer, {
  cors: {
    origin: 'https://wanshow.bingo',
    methods: ['GET', 'POST'],
  },
});

let liveUsers = new Set();

io.on('connection', (socket) => {
  const ipAddress = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
  if (!liveUsers.has(ipAddress)) {
    liveUsers.add(ipAddress);
    io.sockets.emit('liveUsers', { liveUsers: liveUsers.size });
  }

  socket.on('disconnect', () => {
    liveUsers.delete(ipAddress);
    io.sockets.emit('liveUsers', { liveUsers: liveUsers.size });
  });
});

httpsServer.listen(port, () => {
  console.log(`Socket.io server running on port ${port}`);
});
