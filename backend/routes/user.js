const express = require('express');

const UserController = require('../controllers/user');

const checkRecaptcha = require('../middlewares/check-recaptcha');
const decryption = require('../middlewares/decryption');
const encryption = require('../middlewares/encryption');
const errorsLogger = require('../middlewares/errors-logger');

const router = express.Router();

router.post('/registration', errorsLogger, decryption, checkRecaptcha, UserController.createUser, encryption);

router.post('/login', errorsLogger, decryption, checkRecaptcha, UserController.userLogin, encryption);

router.put('/update/:id', errorsLogger, decryption, checkRecaptcha, UserController.userUpdate, encryption);

router.delete('/delete/:id', errorsLogger, decryption, checkRecaptcha, UserController.userDelete, encryption);

module.exports = router;
