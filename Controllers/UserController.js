const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')

const getAll = (req,res) => {

    try{
        User.find({}).select({_id:1,fullname: 1,name: 1,salt:1,hash:1,email: 1,createdAt: 1,updatedAt: 1}).exec((err,userInfo)=>{
            if (err) {return console.log(err);}
            res.send(userInfo)
        })
    }catch(err){
        res.status(400).send(err);
    }
    

}

 const addUser = async (req,res) => {
    
    const {fullname, name,email, password} = req.body;
    
    const Users = new User(
        {
            fullname: req.body.fullname, 
            name : req.body.name,
            email:req.body.fullname
        });
  
          User.register(Users, password, function(err, user) {
            if (err) {
              res.json({success:false, message:"Your account could not be saved. Error: ", err})
            }else{
              res.json({success: true, message: "Your account has been saved"})
            }
          });
}

const Login = (req,res) =>{

    if(!req.body.email){
        res.json({success: false, message: "Email was not given"})
      } else {
        if(!req.body.password){
          res.json({success: false, message: "Password was not given"})
        }else{
          passport.authenticate('local', function (err, user, info) { 
             if(err){
               res.json({success: false, message: err})
             } else{
              if (! user) {
                res.json({success: false, message: 'username or password incorrect'})
              } else{
                req.login(user, function(err){
                  if(err){
                    res.json({success: false, message: err})
                  }else{
                    const token =  jwt.sign({userId : user._id, 
                        email:user.email}, secretkey, 
                          {expiresIn: '24h'})
                    res.json({success:true, message:"Authentication successful", token: token });
                  }
                })
              }
             }
          })(req, res);
        }
      }
    

    
}

module.exports = {getAll,addUser,Login}