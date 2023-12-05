const express = require('express')
const router = express.Router()
const cors = require("cors") 

const validateToken = require('../../Utils/auth').validateToken;

const {create_user, login, getUserInfo} = require('../../Controllers/Users/users.auth');

router.post('/create_user', cors(), create_user);

router.post('/login', cors(), login);

router.post('/getUserInfo', cors(), validateToken, getUserInfo);

module.exports = router