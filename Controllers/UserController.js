const User = require('../Models/User')

const getAll = (req,res) => {

    User.find({}).exec((err,userInfo)=>{
        if (err) {return console.log(err);}
        res.send(userInfo)
    })
}

const addUser = (req,res) => {
    const userToSaved = new User(req.body)

    userToSaved.save(function (err) {
        if (err) {return console.error(err);}
        res.send(userToSaved)
    });
}

module.exports = {getAll,addUser}