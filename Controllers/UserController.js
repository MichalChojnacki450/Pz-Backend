const User = require("../Models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_KEY = "m4m5j4nkjna5jwna2akvkla42jiaolike98"


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
            { user_id: user._id, email },
            process.env.JWT_TOKEN,
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
        console.log(err);
      }
}

const register = async (req,res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && first_name && last_name)) {
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
          first_name:first_name,
          last_name:last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          TOKEN_KEY,
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
        console.log(err);
      }
}

module.exports = {login,register}