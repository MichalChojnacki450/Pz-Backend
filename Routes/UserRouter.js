const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const UserController = require('../Controllers/UserController')

router.post('/login',UserController.login)
router.post('/register',UserController.register)

router.get('/profile',auth,UserController.profile)
router.post('/addFavourite',auth,UserController.addFavourite)
router.get('/favourite',auth,UserController.getFavourite)

module.exports = router