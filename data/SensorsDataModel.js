const child = {
  data: {
    type: Array,
  },
  value: {
    type: Array,
  },
  dataColors: {
    type: Array,
  },
  legend: {
    type: Array,
  },
  names: {
    type: Array,
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  warning: {
    type: Number,
  },
};

const sensorsModel = {
  chartType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  sensorDetails: child,
};

module.exports.sensorsModel = sensorsModel;
