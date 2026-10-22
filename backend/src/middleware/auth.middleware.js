const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ message: '인증 토큰이 없습니다.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
};

module.exports = authMiddleware;
