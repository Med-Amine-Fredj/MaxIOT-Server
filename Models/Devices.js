const mongoose = require('mongoose');

const child = {
  colors: {
    type: Array,
  },
  legend: {
    type: Array,
  },
  names: {
    type: Array,
  },
  min: {
    type: Array,
  },
  max: {
    type: Array,
  },
  warning: {
    type: Array,
  },
  iconName: {
    type: String,
  },
  iconColor: {
    type: String,
  },
  iconBackgroundColor: {
    type: String,
  },
};

const DevicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    chartType: {
      type: String,
    },
    meta: child,
  },
  {
    timestamps: true,
  }
);

const Devices = mongoose.model('Devices', DevicesSchema);

module.exports.Devices = Devices;
