const randomNumberGenerator = require('./functions/randomNumberGenerator');

// console.log(RandomUnderHundredNumber(0, 99, 10000));

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

router.get(
  '/twoDegitNumber',
  asyncHandler(async (req, res) => {
    try {
      res.send(randomNumberGenerator(-99, 99).toString());
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = router;
