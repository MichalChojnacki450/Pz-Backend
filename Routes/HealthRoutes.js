const express = require('express')
const router = express.Router()
const HealthController = require('../Controllers/HealthController')

router.get('/ping',HealthController.ping)

module.exports = router