const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const printSchema = new Schema({
  name: String,
  price: Number,
  image: String,

  position: {
    type: String,
    enum: ["heart", "front", "back"],
});

const Print = mongoose.model("Print", printSchema);

module.exports = Print;
