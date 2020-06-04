const express = require('express')
const router = express.Router()
const { getData } = require('../controllers/patient.controller')

router.get('/', (req, res) => {
    res.status(200).json({
        status: '200',
        success: true,
        message: 'API is running'
    })
})

router.get('/patient', getData)

module.exports = router