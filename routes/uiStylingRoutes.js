const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { UiStyling } = require('../Models/UiStyling');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      let uiStyling = new UiStyling({
        simpleData: {
          scrollable: false,
        },
      });

      const response = await uiStyling.save();

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
      const response = await UiStyling.find();

      res.send(response);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = router;
