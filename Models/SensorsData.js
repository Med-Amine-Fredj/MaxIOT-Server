const mongoose = require('mongoose');

const winston = require('winston');

const valuesSchema = mongoose.Schema(
  {
    values: Number,
  },
  {
    timestamps: true,
  }
);

const sensorsDataSchema = new mongoose.Schema(
  {
    deviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'devices',
      required: true,
      unique: true,
    },
    numberStackedValues: {
      type: Number,
    },
    values: [
      {
        type: new mongoose.Schema(
          {
            value: Number,
          },
          { timestamps: true }
        ),
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SensorsData = mongoose.model('SensorsData', sensorsDataSchema);

module.exports.SensorsData = SensorsData;
