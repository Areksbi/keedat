const Decryption = require('../services/decryption');
const decryption = new Decryption();

module.exports = (req, res, next) => {
  decryption.decrypt(req.body.body)
    .then(body => {
      req.body = JSON.parse(body);
      next();
    })
};
