var express = require('express')
var router = express.Router()

var db = require('../queries')

router.get('/api/boss', db.getRootEmployee)
router.get('/api/employees', db.getEmployees)
router.get('/api/employees/:id', db.getEmployee)
router.post('/api/employees', db.createEmployee)

module.exports = router
