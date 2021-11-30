const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')

router.post('/login',UserController.Login)
router.get('/',UserController.getAll)
router.post('/register',UserController.addUser)

module.exports = router