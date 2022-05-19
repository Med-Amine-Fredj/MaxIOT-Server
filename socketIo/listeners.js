module.exports = function (http) {
  const i = require('socket.io');

  const io = new i.Server(http, { transports: ['websocket'] });

  io.on('connection', function (socket) {
    console.log('conect =========', socket.id);
    io.emit('test', 'hello from node');
    socket.on('disconnect', () => {
      console.log('disconnect =========', socket.connected);
    });
    socket.on('connect_error', () => {
      console.log('socket disconnected with error');
      // socket.connect();
    });
  });

  const deviceValuesUpdate = (data) => {
    io.emit('devices-values-update', data);
  };

  const deviceUpdate = (data) => {
    io.emit('devices-updated', data);
  };

  const deviceRemoved = (data) => {
    io.emit('devices-removed', data);
  };

  const deviceInserted = (data) => {
    io.emit('devices-inserted', data);
  };

  const uiStylingInserted = (data) => {
    io.emit('uiStyling-added', data);
  };

  const uiStylingRemove = (data) => {
    io.emit('uiStyling-removed', data);
  };

  const uiStylingUpdate = (data) => {
    io.emit('uiStyling-updated', data);
  };

  return {
    deviceValuesUpdate,
    deviceUpdate,
    deviceRemoved,
    deviceInserted,
    uiStylingInserted,
    uiStylingRemove,
    uiStylingUpdate,
  };
};
