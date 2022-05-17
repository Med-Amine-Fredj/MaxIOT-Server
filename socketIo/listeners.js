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

  const uiStylingInserted = (data) => {
    io.emit('uiStyling-added', data);
  };

  const uiStylingRemove = (data) => {
    io.emit('uiStyling-removed', data);
  };

  const uiStylingUpdate = (data) => {
    io.emit('uiStyling-updated', data);
  };

  const connSocket = () => {
    io.on('connection', function (socket) {
      console.log('A user connected');
    });
  };

  return {
    deviceValuesUpdate,
    deviceUpdate,
    deviceRemoved,
    deviceInserted,
    connSocket,
    uiStylingInserted,
    uiStylingRemove,
    uiStylingUpdate,
  };
};
