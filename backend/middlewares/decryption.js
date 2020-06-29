const Decryption = require('../services/decryption')
const responseCodes = require('../constants/response-codes.constant')

const decryption = new Decryption()

function parseQuery(queryString) {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

module.exports = (req, res, next) => {
  switch (req.method.toLowerCase()) {
    case 'delete':
    case 'get':
      const splitUrl = req.url.split('?q=');
      const url = splitUrl[0];
      const query = splitUrl[1];

      decryption.decrypt(query)
        .then(params => {
          delete(req.query.q);
          const paramsAsObject = parseQuery(params);
          Object.keys(paramsAsObject).forEach(paramKey => req.query[paramKey] = paramsAsObject[paramKey]);
          next()
        })
        .catch(error => {
          console.error(error)
          res.status(500).json({
            code: responseCodes.DECRYPTION_ERROR_QUERY_PARAMS.code,
            message: responseCodes.DECRYPTION_ERROR_QUERY_PARAMS.message,
          })
        })
      break;
    case 'post':
    case 'put':
      decryption.decrypt(req.body.body)
        .then(body => {
          req.body = JSON.parse(body)
          next()
        })
        .catch(error => {
          console.error(error)
          res.status(500).json({
            code: responseCodes.DECRYPTION_ERROR_BODY.code,
            message: responseCodes.DECRYPTION_ERROR_BODY.message,
          })
        })
      break;
  }
}
