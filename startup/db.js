const mongoose = require('mongoose');
const winston = require('winston');
require('dotenv').config();

module.exports = function () {
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      replicaSet: 'testrep',
    })
    .then(() =>
      winston.info(`Connected to ${process.env.DB}...`.underline.blue)
    );
};
