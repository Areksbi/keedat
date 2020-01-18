const errorCodes = require('../enums/errors.enum');
const fetch = require("node-fetch");

module.exports = (req, res, next) => {
  const url = new URL(`https://www.google.com/recaptcha/api/siteverify`);
  const token = req.body.recaptchaToken;
  const params = {
    secret: process.env.GOOGLE_RECAPTCHA_V3,
    response: token
  };
  url.search = new URLSearchParams(params).toString();
  fetch(url, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        next();
      } else {
        res.status(500).json({
          code: errorCodes.LOGIN_RECAPTCHA_INVALID,
          message: 'Invalid authentication!'
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        code: errorCodes.LOGIN_RECAPTCHA_POST_ERROR,
        message: 'Invalid authentication!'
      });
    });
};
