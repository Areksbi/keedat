module.exports = (req, res, next) => {
  if (res.status >= 300) {
    console.log(res);
  }
  next();
};
