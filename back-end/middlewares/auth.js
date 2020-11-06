const jwt = require('jsonwebtoken');

const tokenHandler = (token, next) => {
  try {
    const JWT_SECRET = 'tentecerveja';
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next({ status: 401, message: err.message });
  }
};

const authMiddleware = (required) => async (req, _res, next) => {
  const { authorization } = req.headers;
  if (!required) return next();
  if (!authorization) return next({ status: 401, message: 'Usuário não logado' });
  req.user = tokenHandler(authorization, next);
  return next();
};

module.exports = authMiddleware;
