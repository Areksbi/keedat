const Encryption = require('../services/encryption');
const encryption = new Encryption();

module.exports = (req, res, next) => {
  const response = res.locals.response

  if (response.response) {
    encryption.encrypt(JSON.stringify(response.response))
      .then(result => {
        res.status(response.status).json({
          code: response.codeObject.code,
          message: response.codeObject.message,
          response: result
        });
        next()
      })
  } else {
    res.status(response.status).json({
      code: response.codeObject.code,
      message: response.codeObject.message,
    });
    next()
  }
};

