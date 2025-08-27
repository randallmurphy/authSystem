
module.exports = (req, res, next) => {
  console.log('🧠 Middleware activated at:', new Date().toISOString());
  next();
};
