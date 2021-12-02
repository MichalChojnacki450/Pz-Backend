const mongoose = require("mongoose");

const lodziarniaSchema = new mongoose.Schema({
  name: { type: String, default: null },
  city: { type: String, default: null},
  adress: { type: String, default: null,unique:true},
});

module.exports = mongoose.model("lodziarnie", lodziarniaSchema);