const asyncHandler = require('express-async-handler');
const express = require('express');

const router = express.Router();

const { SensorsData } = require('../Models/SensorsData');

// @desc Add New Value To device Id
// @route PUT api/sensors/
// @body : { deviceId,value}
router.put(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const response = await SensorsData.find({ deviceId: req.body.deviceId });
      if (response) {
        const oldData = response[0].values.map((res) => {
          return res;
        });

        const result = await SensorsData.findByIdAndUpdate(
          response[0]._id.toString(),
          {
            numberStackedValues: req.body.numberStackedValues,
            values: [
              ...oldData,
              {
                value: req.body.value || null,
              },
            ],
          }
        );
        const ok = await SensorsData.findById(response[0]._id.toString());
        res.json(ok);
      } else {
        res.status(404);
        throw new Error('Device not Found !');
      }
    } catch (error) {
      throw new Error('' + error);
    }
  })
);

// @desc get all devices and their data
// @route GET api/sensors/
router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const response = await SensorsData.find();
      if (response) {
        res.json(response);
      } else {
        res.status(404);
        throw new Error('Device not Found !');
      }
    } catch (error) {
      throw new Error('' + error);
    }
  })
);

// @desc delete device data by ID
// @route DELETE api/sensors/:id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      const device = await SensorsData.findOneAndDelete({
        deviceId: req.params.id,
      });
      if (device) {
        res.json(device);
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
