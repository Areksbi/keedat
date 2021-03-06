const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'Invalid registration credentials!'
          });
        });
    });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
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
      res.status(200).json({
        email: fetchedUser.email,
        expiresIn: 3600,
        token,
        userId: fetchedUser._id
      });
    })
    .catch(err =>
      res.status(401).json({
        message: 'Invalid authentication credentials!'
      }));
};

exports.userUpdate = async (req, res, next) => {
  const reqId = req.params.id;
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  const reqNewPassword = req.body.newPassword;
  const $set = {};

  if (reqEmail) {
    $set.email = reqEmail;
  }
  if (reqPassword && reqNewPassword) {
    const isPasswordCorrect = await User.findById(reqId)
      .then(user => {
        if (!user) {
          return res.status(401).json({
            code: responseCodes.ACCOUNT_UPDATE_INVALID_PASSWORD_SUCCESS.code,
            message: responseCodes.ACCOUNT_UPDATE_INVALID_PASSWORD_SUCCESS.message,
          });
        }
        return bcrypt.compare(reqPassword, user.password);
      });

    if (isPasswordCorrect) {
      $set.password = await bcrypt.hash(reqNewPassword, 10);
    }
  }

  if (Object.keys($set).length <= 0) {
    return res.status(500).json({
      code: responseCodes.ACCOUNT_UPDATE_NO_BODY_SUCCESS.code,
      message: responseCodes.ACCOUNT_UPDATE_NO_BODY_SUCCESS.message,
    });
  }

  User.findOneAndUpdate({_id: reqId}, { $set })
    .then((user) => {
      if (user) {
        User.findById(user._id)
          .then(updatedUser =>
            res.status(200).json({
              code: responseCodes.ACCOUNT_UPDATE_SUCCESS.code,
              message: responseCodes.ACCOUNT_UPDATE_SUCCESS.message,
              result: {
                email: updatedUser.email
              }
            }))
          .catch(() =>
            res.status(500).json({
              code: responseCodes.ACCOUNT_RETRIEVE_AFTER_UPDATE_ERROR.code,
              message: responseCodes.ACCOUNT_RETRIEVE_AFTER_UPDATE_ERROR.message,
            }))
      } else {
        return res.status(500).json({
          code: responseCodes.ACCOUNT_UPDATE_NO_RESPONSE_ERROR.code,
          message: responseCodes.ACCOUNT_UPDATE_NO_RESPONSE_ERROR.message
        })
      }
    })
    .catch(() =>
      res.status(500).json({
        code: responseCodes.ACCOUNT_UPDATE_ERROR.code,
        message: responseCodes.ACCOUNT_UPDATE_ERROR.message
      }));

};

exports.userDelete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((response) => {
      if (response) {
        return res.status(200).json({
          code: responseCodes.ACCOUNT_DELETE_SUCCESS.code,
          message: responseCodes.ACCOUNT_DELETE_SUCCESS.message
        });
      }
      return res.status(500).json({
        code: responseCodes.ACCOUNT_DELETE_NOTHING.code,
        message: responseCodes.ACCOUNT_DELETE_NOTHING.message
      })
    })
    .catch(() =>
      res.status(500).json({
        code: responseCodes.ACCOUNT_DELETE_ERROR.code,
        message: responseCodes.ACCOUNT_DELETE_ERROR.message
      }));
};
