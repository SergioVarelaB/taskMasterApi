// async function test
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { required } = require("nodemon/lib/config");
const User = require('../../Models/User/user.model').User


async function create_user(req, res) {
    // 2. hash password
    const salt = 10
    bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
         const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hash
        });
        if(err){
            res.status(500).send(err)
        }
         // 3. add a new user to mongodb
         User.create(user)
         // 4. send status back to requestor
         res.status(201).send('User was added')
    });
}


// login
async function login(req, res) {
    // 1. find the user
    const user = await User.findOne({ email: req.body.email })
  
    // 2. compare the password from req vs password in db - Authenticated ok
    const userAllowed = await bcrypt.compare(req.body.password, user.password)
    // 3. create jwt token = Authorization
    if (userAllowed) {
      const accessToken = jwt.sign(user.toJSON(), 'secret-key-shhhh');
      user.accessToken = accessToken;
      await user.save();
      // 4. send JWT token to frontend requestor
      res.status(200).send({ accessToken: accessToken, user: user})
    } else {
      res.send('No user found or invalid password')
    }
}


async function getUserInfo(req, res){
    const auhorizationHeader = req.headers.authorization;
    const token = req.headers.authorization.split(" ")[1];
    let user = await User.findOne({
        accessToken: token,
    });
    res.status(200).send(user)
}

module.exports = {
    create_user,
    login,
    getUserInfo
}