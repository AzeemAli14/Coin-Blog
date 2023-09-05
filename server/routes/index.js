const express = require('express');

const router = express.Router();

// test
router.get('/test', (req, res) => {
    res.json({ message: 'Hello World Testing' })
})

//login
router.post('/login', authController.login);