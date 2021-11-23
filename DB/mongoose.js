const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/Lodziarnia"
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected')
});



module.exports = db;