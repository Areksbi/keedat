const Decryption = require('../services/decryption')
const responseCodes = require('../constants/response-codes.constant')

const decryption = new Decryption()

module.exports = (req, res, next) => {
  decryption.decrypt(req.body.body)
    .then(body => {
      req.body = JSON.parse(body)
      next()
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({
        code: responseCodes.DECRYPTION_ERROR.code,
        message: responseCodes.DECRYPTION_ERROR.message,
      })
    })
}
