const express = require('express');
const iotApi = require('../mockIotServer/iotApi');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/iot', iotApi);
};
