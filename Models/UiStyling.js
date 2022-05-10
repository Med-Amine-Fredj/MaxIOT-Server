const mongoose = require('mongoose');

const UiStylingSchema = new mongoose.Schema(
  {
    layout: {
      type: String,
    },
    components: [
      {
        deviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'devices',
          required: true,
          unique: true,
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
