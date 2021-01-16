const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImg: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Guignol_in_Lyon_1.jpg/1200px-Guignol_in_Lyon_1.jpg"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
