const express = require('express')
const router = express.Router()
const UserController = require('../Controllers/UserController')

router.get('/',UserController.getAll)
router.post('/',UserController.addUser)

module.exports = router