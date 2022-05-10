const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { UiStyling } = require('../Models/UiStyling');

// @desc Add New deviceID  To row or col In ui
// @route PUT /api/uiStyling/
// @body : { id, layout ,deviceId}
router.put(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const uiID = req.body.id || null;
      const deviceID = req.body.deviceId || null;
      const response = await UiStyling.findById(uiID);

      if (response) {
        const oldData = response.components.map((res) => {
          return res;
        });

        const result = await UiStyling.findByIdAndUpdate(uiID, {
          layout: req.body.layout,
          components: [
            ...oldData,
            {
              deviceId: deviceID,
            },
          ],
        });
        res.json(result);
      } else {
        let uiStylingData = new UiStyling({
          layout: req.body.layout,
          components: [
            {
              deviceId: deviceID,
            },
          ],
        });
        const addResult = await uiStylingData.save();
        res.json(addResult);
      }
    } catch (error) {
      throw new Error('' + error);
    }
  })
);

// @desc get all uiStyling
// @route GET /api/uiStyling/
router.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      const response = await UiStyling.find();
      if (response) {
        res.json(response);
      } else {
        throw new Error('No Data Found !');
      }
    } catch (error) {
      throw new Error('' + error);
    }
  })
);

module.exports = router;
