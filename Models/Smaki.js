const mongoose = require("mongoose");

const smakiSchema = new mongoose.Schema({
  lodziarnia: { type: String, default: null },
  adress: { type: String, default: null,unique:true},
  nazwaSmaku:{type:String,default:null},
  dostepnosc:{type:Boolean}
});

module.exports = mongoose.model("smaki", smakiSchema);