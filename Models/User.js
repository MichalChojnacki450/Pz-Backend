const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  favourite: [{nazwa:String, adress:String}],
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);