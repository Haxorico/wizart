const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complainSchema = new Schema({
  id: { type: String, required: true, unique: true },
  getTime: { type: Date, required: true },
  IsBeenCared: { type: Boolean, required: true },
});

module.exports = mongoose.model("Complain", complainSchema);
