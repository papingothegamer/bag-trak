const { io } = require('socket.io-client');

const USER_ID = '673a835ca03d392bac541c01';
const socket = io('http://localhost:5000', {
  transports: ['websocket'],
  reconnection: true,
});

socket.on('connect', () => {
  console.log('Connected to Socket.io server');
  socket.emit('join', USER_ID);
  console.log('Joined room for user:', USER_ID);
});

socket.on('bagStatusChanged', (data) => {
  console.log('\n🔄 Bag Status Update Received:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.log('Connection error:', error);
});

console.log('Test client running. Waiting for updates...');
