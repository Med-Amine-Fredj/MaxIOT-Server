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

const SensorsData = require('./Models/SensorsData');
const devices = require('./Models/Devices');
const { default: axios } = require('axios');

SensorsData.SensorsData.watch().on('change', (data) => {
  data.operationType == 'update' &&
    deviceValuesUpdate({
      id: data?.documentKey?._id,
      values: data?.updateDescription?.updatedFields?.values,
    });
});

devices.Devices.watch().on('change', (data) => {
  console.log(data);
  data.operationType == 'update' &&
    deviceUpdate({
      id: data?.documentKey?._id,
      meta: data?.updateDescription?.updatedFields?.meta,
    });
  if (data.operationType == 'delete') {
    deleteDevice(data.documentKey._id.toString());
    deviceRemoved(data.documentKey._id.toString());
  }
  if (data.operationType == 'insert') {
    console.log(data.fullDocument);
    SensorsData.SensorsData;

    const small = new SensorsData.SensorsData({
      deviceId: data.fullDocument._id.toString(),
      values: [0],
    });
    small.save();
    deviceInserted(data.fullDocument);
  }
});

io.on('connection', function (socket) {
  console.log('A user connected');
  socket.on('disconnect', function () {
    console.log('A user disconnected');
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

const deleteDevice = async (id) => {
  try {
    await axios.delete(`http://192.168.1.93:5000/api/sensors/${id}`);
  } catch (error) {
    console.log(error);
  }
};

PORT = process.env.PORT || 5000;

http.listen(5000, () =>
  winston.info(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`
      .underline.magenta
  )
);

IOT_PORT = process.env.IOT_PORT || 5001;

iotServer.listen(IOT_PORT, () =>
  winston.info(
    `IOTServer is running on ${process.env.NODE_ENV} mode on port  ${IOT_PORT}`
      .underline.yellow
  )
);
