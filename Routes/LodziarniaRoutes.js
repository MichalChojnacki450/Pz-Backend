const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const LodziarniaController = require('../Controllers/LodziarniaController')

router.post('/register',auth,LodziarniaController.register)
router.post('/taste/add',auth,LodziarniaController.addTaste)

module.exports = router