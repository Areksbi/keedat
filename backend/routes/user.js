const express = require('express');

const UserController = require('../controllers/user');

const checkRecaptcha = require('../middlewares/check-recaptcha');

const router = express.Router();

router.post('/registration', checkRecaptcha, UserController.createUser);

router.post('/login', checkRecaptcha, UserController.userLogin);

router.delete('/delete/:id', checkRecaptcha, UserController.userDelete);

module.exports = router;
