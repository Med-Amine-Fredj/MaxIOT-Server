const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { json } = require('express/lib/response');

const { SensorsData } = require('../Models/SensorsData');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      let sensorData = new SensorsData({
        deviceId: req.body.deviceId,
        values: req.body.values || null,
      });

      const response = await sensorData.save();

      res.send(response);
    } catch (error) {
      console.log(error);
    }
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const response = await SensorsData.find();

      res.send(response);
    } catch (error) {
      console.log(error);
    }
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const device = await SensorsData.findOneAndDelete({
        deviceId: req.params.id,
      });

      res.send(device);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = router;
