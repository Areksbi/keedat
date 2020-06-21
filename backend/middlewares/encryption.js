const Encryption = require('../services/encryption');
const encryption = new Encryption();

module.exports = (req, res, next) => {
  console.log('sono nella funzione: ', process.env.RESPONSE_ENCRYPTION_KEY)

  const defaultWrite = res.write;
  const defaultEnd = res.end;
  const chunks = [];

  res.write = (...restArgs) => {
    chunks.push(new Buffer(restArgs[0]));
    defaultWrite.apply(res, restArgs);
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(new Buffer(restArgs[0]));
    }
    const body = Buffer.concat(chunks).toString('utf8');

    console.log(body);

    defaultEnd.apply(res, restArgs);
  };

  next();
};
