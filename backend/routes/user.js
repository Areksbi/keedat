const express = require('express');

const UserController = require('../controllers/user');

const checkRecaptcha = require('../middlewares/check-recaptcha');
const errorsLogger = require('../middlewares/errors-logger');

const router = express.Router();

router.post('/registration', checkRecaptcha, UserController.createUser, errorsLogger);

router.post('/login', checkRecaptcha, UserController.userLogin, errorsLogger);

router.put('/update/:id', checkRecaptcha, UserController.userUpdate, errorsLogger);

router.delete('/delete/:id', checkRecaptcha, UserController.userDelete, errorsLogger);

module.exports = router;
