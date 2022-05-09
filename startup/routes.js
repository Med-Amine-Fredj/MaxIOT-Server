const express = require('express');
const sensors = require('../routes/sensorsRoutes');
const uiStyling = require('../routes/uiStylingRoutes');
const devices = require('../routes/devicesRoutes');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/sensors', sensors);
  app.use('/api/uiStyling', uiStyling);
  app.use('/api/devices', devices);
};
