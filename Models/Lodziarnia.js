const mongoose = require("mongoose");

const lodziarniaSchema = new mongoose.Schema({
  name: { type: String, default: null},
  city: { type: String, default: null},
  adress: { type: String, default: null,unique:true},
  lat:{type:Number, default:0,unique:true},
  lon:{type:Number, default:0,unique:true},
});

module.exports = mongoose.model("lodziarnie", lodziarniaSchema);