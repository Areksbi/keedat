const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const responseCodes = require('../constants/response-codes.constant');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        'consent-privacy-policy': req.body.privacyPolicyConsent,
        'date-creation': new Date().toISOString(),
        email: req.body.email,
        password: hash,
      });
      user.save()
        .then(() => {
          res.locals.response = {
            status: 201,
            codeObject: responseCodes.REGISTRATION_SUCCESS,
          }
          next()
        })
        .catch(() => {
          res.locals.response = {
            status: 500,
            codeObject: responseCodes.REGISTRATION_ERROR
          }
          next()
        });
    })
    .catch(() => {
      res.locals.response = {
        status: 500,
        codeObject: responseCodes.REGISTRATION_HASHING_ERROR
      }
      next()
    });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.locals.response = {
          status: 401,
          codeObject: responseCodes.LOGIN_NO_USER_ERROR
        }
        next()
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        res.locals.response = {
          status: 401,
          codeObject: responseCodes.LOGIN_INVALID_PASSWORD_ERROR
        }
        next()
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      );
      res.locals.response = {
        status: 200,
        codeObject: responseCodes.LOGIN_SUCCESS,
        response: {
          email: fetchedUser.email,
          expiresIn: 3600,
          token,
          userId: fetchedUser._id
        }
      }
      next()
    })
    .catch(err => {
      console.error(err)
      res.locals.response = {
        status: 401,
        codeObject: responseCodes.LOGIN_INVALID_ERROR,
      }
      next()
    });
};

exports.userUpdate = (req, res, next) => {
  const reqId = req.params.id;
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  const reqNewPassword = req.body.newPassword;
  const $set = {};

  const fieldsToUpdate = [];

  if (reqEmail) {
    fieldsToUpdate.push(new Promise((resolve) => resolve(reqEmail)))
  } else {
    fieldsToUpdate.push(new Promise((resolve) => resolve()))
  }

  fieldsToUpdate.push(
    reqPassword && reqNewPassword
      ? User.findById(reqId)
        .then(user => {
            if (!user) {
              res.locals.response = {
                status: 401,
                codeObject: responseCodes.ACCOUNT_UPDATE_INVALID_PASSWORD_SUCCESS,
              }
              next()
            }
            return bcrypt.compare(reqPassword, user.password);
          })
          .then(isPasswordCorrect => {
            if (isPasswordCorrect) {
              return bcrypt.hash(reqNewPassword, 10);
            }
          })
      : new Promise((resolve) => resolve())
  )

  Promise.all(fieldsToUpdate)
    .then(([email, password]) => {
      if (email) {
        $set.email = reqEmail;
      }
      if (password) {
        $set.password = password;
      }

      if (Object.keys($set).length <= 0) {
        res.locals.response = {
          status: 500,
          codeObject: responseCodes.ACCOUNT_UPDATE_NO_BODY_SUCCESS,
        }
        next()
      }

      User.findOneAndUpdate({ _id: new mongoose.mongo.ObjectID(reqId) }, { $set })
        .then((user) => {
          if (user) {
            User.findById(user._id)
              .then(updatedUser => {
                res.locals.response = {
                  status: 200,
                  codeObject: responseCodes.ACCOUNT_UPDATE_SUCCESS,
                  response: {
                    email: updatedUser.email,
                  }
                }
                next()
              })
              .catch(() => {
                res.locals.response = {
                  status: 500,
                  codeObject: responseCodes.ACCOUNT_RETRIEVE_AFTER_UPDATE_ERROR,
                }
                next()
              })
          } else {
            res.locals.response = {
              status: 500,
              codeObject: responseCodes.ACCOUNT_UPDATE_NO_RESPONSE_ERROR,
            }
            next()
          }
        })
        .catch((err) => {
          console.error(err)
          res.locals.response = {
            status: 500,
            codeObject: responseCodes.ACCOUNT_UPDATE_ERROR,
          }
          next()
        });

    })
};

exports.userDelete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((response) => {
      if (response) {
        res.locals.response = {
          status: 200,
          codeObject: responseCodes.ACCOUNT_DELETE_SUCCESS,
        }
        next()
      }
      res.locals.response = {
        status: 500,
        codeObject: responseCodes.ACCOUNT_DELETE_NOTHING,
      }
      next()
    })
    .catch((err) => {
      console.error(err)
      res.locals.response = {
        status: 500,
        codeObject: responseCodes.ACCOUNT_DELETE_ERROR,
      }
      next()
    });
};

