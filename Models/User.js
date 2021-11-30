const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        unique:true,
        require:true
    },
    name:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
},{timestamps:true})

UserSchema.plugin(passportLocalMongoose,{usernameField:'email'})

const User = mongoose.model('users',UserSchema)
module.exports = User