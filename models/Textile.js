const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textileSchema = new Schema({
   
    image: String,
    name: String,
    ref: String,
    description: String,
    price: Number,

    size: {
    type: String,
    enum: ["s", "m", "l", "xl"],
  },
});

const Textile = mongoose.model("Textile", textileSchema);

module.exports = Textile;
