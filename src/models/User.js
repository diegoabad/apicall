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
});

module.exports = model("User", userSchema);
