const express = require('express')
const { exportToPdf, updatePdf, deletePdf } = require('./pdf.controller')
const router = express.Router()

router.post('/', exportToPdf)

router.put('/:pdfId', updatePdf)

router.delete('/:pdfId', deletePdf)

module.exports = router