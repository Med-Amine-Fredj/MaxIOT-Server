const mongoose = require('mongoose');

const UiStylingSchema = new mongoose.Schema(
  {
    layout: {
      type: String,
    },
    components: [
      {
        deviceId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UiStyling = mongoose.model('UiStyling', UiStylingSchema);

module.exports.UiStyling = UiStyling;
