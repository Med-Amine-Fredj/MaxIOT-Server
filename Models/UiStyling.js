const mongoose = require('mongoose');

const scrollSchema = new mongoose.Schema({
  scrollable: {
    type: Boolean,
  },
});

const UiStylingSchema = new mongoose.Schema(
  {
    simpleData: {
      scrollable: {
        type: Boolean,
        default: true,
      },
    },
    barCharts: {
      scrollable: {
        type: Boolean,
        default: true,
      },
    },
    gaugeCharts: {
      scrollable: {
        type: Boolean,
        default: true,
      },
    },
    lineCharts: {
      scrollable: {
        type: Boolean,
        default: true,
      },
    },
    icons: {
      scrollable: {
        type: Boolean,
        default: true,
      },
    },
    pieCharts: {
      scrollable: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UiStyling = mongoose.model('UiStyling', UiStylingSchema);

module.exports.UiStyling = UiStyling;
