const colors = require('colors');

const express = require('express');
const app = express();

const winston = require('winston');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const iotServer = express();

require('dotenv').config();
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./mockIotServer/routes')(iotServer);

const listeners = require('./socketIo/listeners')(http);

const SensorsData = require('./Models/SensorsData');
const devices = require('./Models/Devices');
const UiStyling = require('./Models/UiStyling');

SensorsData.SensorsData.watch().on('change', (data) => {
  data.operationType == 'update' &&
    listeners.deviceValuesUpdate({
      id: data?.documentKey?._id,
      values: data?.updateDescription?.updatedFields?.values?.slice(-1)[0],
    });
});

devices.Devices.watch().on('change', (data) => {
  if (data.operationType == 'update') {
    listeners.deviceUpdate({
      id: data?.documentKey?._id.toString(),
      meta: data?.updateDescription?.updatedFields?.meta,
    });
  }
  if (data.operationType == 'delete') {
    listeners.deviceRemoved(data.documentKey._id.toString());
  }
  if (data.operationType == 'insert') {
    listeners.deviceInserted(data.fullDocument);
  }
});

UiStyling.UiStyling.watch().on('change', (data) => {
  if (data.operationType == 'insert') {
    listeners.uiStylingInserted(data.fullDocument);
  }
  if (data.operationType == 'update') {
    listeners.uiStylingUpdate({
      id: data?.documentKey?._id.toString(),
      components: data?.updateDescription?.updatedFields?.components,
    });
  }
  if (data.operationType == 'delete') {
    listeners.uiStylingRemove(data.documentKey._id.toString());
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
