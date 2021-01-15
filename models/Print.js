const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const printSchema = new Schema({
  price: {type:Number, default: 20},
  image: String,
  textile: {type: Schema.Types.ObjectId, ref:"Textile"},
  position: {
    type: String,
    enum: ["heart", "front", "back"],
  }
});

const Print = mongoose.model("Print", printSchema);

module.exports = Print;
