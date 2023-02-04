const { Schema, model } = require("mongoose");

const statusSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = model("Status", statusSchema);
