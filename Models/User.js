const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})

const User = mongoose.model('users',UserSchema)
module.exports = User