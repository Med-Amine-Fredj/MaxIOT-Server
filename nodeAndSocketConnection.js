const io = require('socket.io-client');

const socket = io('http://192.168.1.92:5000/', { transports: ['websocket'] });
// console.log(socket);

// socket.connect();

socket.on('connect', () => {
  console.log('Connected with ID : ', socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on('disconnect', () => {
  console.log('disconnected'); // undefined
});

socket.on('test', (data) => {
  console.log(data);
});

socket.on('connect_error', (err) => {
  //   socket.auth.token = 'abcd';
  console.log('error connecting', err);
  socket.connect();
});
