const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid Email",
      isAsync: false,
    },
  },
  password: {
    type: String,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {toJSON: {virtuals: true}});

module.exports = mongoose.model("User", UserSchema);
