const express = require('express')
const router = express.Router()
const cors = require("cors") 

const create_user = require('../../Controllers/Users/users.auth').create_user

router.post('/create_user', cors(), create_user)


module.exports = router