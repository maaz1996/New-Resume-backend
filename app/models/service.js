const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ServiceSchema = new mongoose.Schema(
  {
    details: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "ON",
      enum: ["ON", "OFF"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profile", ServiceSchema);
