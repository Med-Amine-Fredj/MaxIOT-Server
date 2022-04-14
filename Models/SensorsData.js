const mongoose = require('mongoose');

const winston = require('winston');

const sensorsDataSchema = new mongoose.Schema(
  {
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'devices',
      required: true,
      unique: true,
    },
    values: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const SensorsData = mongoose.model('SensorsData', sensorsDataSchema);

module.exports.SensorsData = SensorsData;
