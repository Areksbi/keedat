const express = require('express');

const UserController = require('../controllers/user');

const checkRecaptcha = require('../middlewares/check-recaptcha');
const decryption = require('../middlewares/decryption');
// const encryption = require('../middlewares/encryption');
const errorsLogger = require('../middlewares/errors-logger');

const router = express.Router();

router.post('/registration', decryption, checkRecaptcha, UserController.createUser, /*errorsLogger, encryption*/);

router.post('/login', decryption, checkRecaptcha, UserController.userLogin/*, errorsLogger, encryption*/);

router.put('/update/:id', decryption, checkRecaptcha, UserController.userUpdate/*, errorsLogger, encryption*/);

router.delete('/delete/:id', decryption, checkRecaptcha, UserController.userDelete/*, errorsLogger, encryption*/);

module.exports = router;
