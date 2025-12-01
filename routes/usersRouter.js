const express = require('express');
const router = express.Router();
const { RegisterUser, LoginUser, LogoutUser } = require('../controllers/AuthController')


router.get('/', function (req, res) {
    res.send('User model is working')
})

router.post('/register', RegisterUser);

router.post('/login', LoginUser);

router.get('/logout', LogoutUser);

module.exports = router;