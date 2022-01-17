const jwt = require("jsonwebtoken");
const env = require('../env.json')


const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
    
    // console.log(token)
    // console.log(config.TOKEN_KEY)

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  else{
    try {
        const decoded = jwt.verify(token, env.TOKEN_KEY);
        // console.log(decoded)
        req.user = decoded;    
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
  }

};

module.exports = verifyToken;