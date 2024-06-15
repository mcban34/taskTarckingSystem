const jwt = require('jsonwebtoken');
const verify = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
      }
      req.userId = decoded.id;
      next();
    });
};

module.exports = verify;