const fetch = require('node-fetch');
const responseCodes = require('../constants/response-codes.constant');

module.exports = (req, res, next) => {
  const url = new URL(`https://www.google.com/recaptcha/api/siteverify`);
  const getToken = () => {
    switch (req.method.toLowerCase()) {
      case 'delete':
      case 'get':
        return req.query.recaptchaToken;
      case 'post':
      case 'put':
        return req.body.recaptchaToken;
    }
  };
  const params = {
    secret: process.env.GOOGLE_RECAPTCHA_V3,
    response: getToken()
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
          code: responseCodes.RECAPTCHA_INVALID.code,
          message: responseCodes.RECAPTCHA_INVALID.message
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        code: responseCodes.RECAPTCHA_POST_ERROR.code,
        message: responseCodes.RECAPTCHA_POST_ERROR.message
      });
    });
};
