const express = require('express')
const { exportToPdf } = require('./pdf.controller')
const router = express.Router()

router.post('/', 
    exportToPdf
)

module.exports = router