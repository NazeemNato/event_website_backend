const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      default: "https://i.imgur.com/KCgjQmd.jpg",
    },
    description: {
      type: String,
      require: true,
    },
    location: {
      type: String,
    },
    date: {
      type: String,
    },
    price: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true } }
);

module.exports = mongoose.model("Event", EventSchema);
