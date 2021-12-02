const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const LodziarniaController = require('../Controllers/LodziarniaController')

router.post('/register',auth,LodziarniaController.register)

module.exports = router