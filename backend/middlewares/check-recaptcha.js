const responseCodes = require('../constants/response-codes.constant');
const fetch = require('node-fetch');

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
          code: responseCodes.LOGIN_RECAPTCHA_INVALID.code,
          message: responseCodes.LOGIN_RECAPTCHA_INVALID.message
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        code: responseCodes.LOGIN_RECAPTCHA_POST_ERROR.code,
        message: responseCodes.LOGIN_RECAPTCHA_POST_ERROR.message
      });
    });
};
