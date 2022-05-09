const asyncHandler = require('express-async-handler');
const express = require('express');

const router = express.Router();

const { Devices } = require('../Models/Devices');
const { SensorsData } = require('../Models/SensorsData');

// @desc add new device
// @route POST api/devices/
router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      let device = new Devices({
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

      let deviceData = new SensorsData({
        deviceId: response._id.toString(),
      });

      await deviceData.save();

      res.json(response);
    } catch (error) {
      throw new Error('' + error);
    }
  })
);

// @desc get all devices
// @route GET api/devices/
router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const response = await Devices.find();
      if (response) {
        res.json(response);
      } else {
        res.status(404);
        throw new Error('No Data Found !');
      }
    } catch (error) {
      throw new Error('' + error);
    }
  })
);

module.exports = router;
