const express = require('express');
const app = express();

const colors = require('colors');
const winston = require('winston');

const iotServer = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv').config();
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./mockIotServer/routes')(iotServer);

const listeners = require('./socketIo/listeners')(http);

const SensorsData = require('./Models/SensorsData');
const devices = require('./Models/Devices');

SensorsData.SensorsData.watch().on('change', (data) => {
  data.operationType == 'update' &&
    listeners.deviceValuesUpdate({
      id: data?.documentKey?._id,
      values: data?.updateDescription?.updatedFields?.values?.slice(-1)[0],
    });
  console.log({
    id: data?.documentKey?._id.toString(),
    values: data?.updateDescription?.updatedFields?.values?.slice(-1)[0],
  });
});
devices.Devices.watch().on('change', (data) => {
  data.operationType == 'update' &&
    listeners.deviceUpdate({
      id: data?.documentKey?._id,
      meta: data?.updateDescription?.updatedFields?.meta,
    });

  if (data.operationType == 'delete') {
    listeners.deviceRemoved(data.documentKey._id.toString());
  }
  if (data.operationType == 'insert') {
    console.log(data.fullDocument);
    listeners.deviceInserted(data.fullDocument);
  }
});

PORT = process.env.PORT || 5000;
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('User Disconnected');
  });
});

http.listen(5000, () => {
  winston.info(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`
      .underline.magenta
  );
});

IOT_PORT = process.env.IOT_PORT || 5001;

iotServer.listen(IOT_PORT, () =>
  winston.info(
    `IOTServer is running on ${process.env.NODE_ENV} mode on port  ${IOT_PORT}`
      .underline.yellow
  )
);
