const User = require("../Models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../env.json')


const login = async (req,res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email: email,name: user.name },
            env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).send(user);
        }
        else
        {
          res.status(404).send("Invalid Credentials");
        }
      } catch (err) {
        console.log(err)
        res.send(404).send(err)
      }
}

const register = async (req,res) => {
    try {
        // Get user input
        const { name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && name)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User({
          name:name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email: email,name: name },
          env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;

        user.save();
    
        // return new user
        res.status(201).send(user);
      } catch (err) {
        console.log(err)
        res.send(404).send(err)
      }
}

const profile = (req,res) => {
  User.findOne({email:req.user.email}).select({name:1,email:1,favourite:1}).exec((err,userInfo)=>{
    res.send(userInfo)
  })
}

const addFavourite = (req,res)=>{
  try
  {
    const name = req.body

    User.findOneAndUpdate({email:req.user.email},
      {
        "$push": {
          favourite: name
        }
      }
      ).then(userInfo=>{
      res.status(200).send(userInfo)
    })
  }
  catch(err)
  {
    res.status(404).send(err)
  }
  
}

const getFavourite = (req,res) => {
  User.findOne({email:req.user.email}).select({favourite:1}).exec((err,userInfo)=>{
    res.send(userInfo)
  })
}

module.exports = {login,register,profile,addFavourite,getFavourite}