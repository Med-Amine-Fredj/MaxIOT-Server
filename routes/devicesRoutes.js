const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { Devices } = require('../Models/Devices');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      let device = new Devices({
        deviceId: req.body.deviceId,
        name: req.body.name,
        chartType: req.body.chartType,
        meta: req.body.meta
          ? {
              colors: req.body.meta.colors || null,

              legend: req.body.meta.legend || null,

              names: req.body.meta.names || null,

              min: req.body.meta.min || null,

              max: req.body.meta.max || null,

              warning: req.body.meta.warning || null,

              iconName: req.body.meta.iconName || null,

              iconColor: req.body.meta.iconColor || null,

              iconBackgroundColor: req.body.meta.iconBackgroundColor || null,
            }
          : null,
      });

      const response = await device.save();

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
      const response = await Devices.find();

      res.send(response);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = router;
