const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  status: {
    type: String,
  },
  img: {
    type: String,
  },
  birth: {
    type: Date,
  },
  google: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("User", userSchema);
