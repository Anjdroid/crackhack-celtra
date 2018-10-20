var express = require('express')
var router = express.Router()

var db = require('../queries')

router.get('/api/kudos', db.getKudos)
router.get('/api/kudos/:id', db.getKudo)
router.post('/api/kudos', db.createKudos)

module.exports = router
