const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const LodziarniaController = require('../Controllers/LodziarniaController')

router.post('/register',auth,LodziarniaController.register)
router.post('/taste/add',auth,LodziarniaController.addTaste)
router.post('/taste/edit',LodziarniaController.editTaste)
router.get('/',LodziarniaController.getByAdress)
router.get('/all',LodziarniaController.getAll)
router.get('/taste',LodziarniaController.getTaste)

module.exports = router