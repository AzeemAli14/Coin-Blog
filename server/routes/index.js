const express = require('express');

const authController = require('../controller/authController');

const router = express.Router();

// test
router.get('/test', (req, res) => {
    res.json({ message: 'Hello World Testing' })
})

//register
router.post('/register', authController.register);

//login
router.post('/login', authController.login);

module.exports = router;