const jwt = require('jsonwebtoken');


exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    req.user = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
