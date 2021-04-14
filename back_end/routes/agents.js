const express = require('express')
const router = express.Router()
const agentController = require('../controllers/agents')

router.post('/auth', agentController.login)


module.exports = router