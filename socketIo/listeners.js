module.exports = function (http) {
  const io = require('socket.io')(http);
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
};
