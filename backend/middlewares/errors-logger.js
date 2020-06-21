module.exports = (req, res, next) => {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (...restArgs) => {
    chunks.push(Buffer.from(restArgs[0]));
    oldWrite.apply(res, restArgs);
  };

  res.end = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(Buffer.from(restArgs[0]));
    }
    const body = JSON.parse(Buffer.concat(chunks).toString('utf8'));

    if (res.statusCode >= 400) {
      console.log({
        time: new Date().toUTCString(),
        fromIP: req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress,
        method: req.method,
        originalUri: req.originalUrl,
        uri: req.url,
        requestData: req.body,
        responseData: body,
        referer: req.headers.referer || '',
        status: res.statusCode,
        ua: req.headers['user-agent'],
      });
    }

    oldEnd.apply(res, restArgs);
  };

  next();
};
