// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;  // Ensure that the token is coming from cookies, or modify accordingly.
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden, admin access required.' });
    }

    req.user = user;  // Attach user info to the request object for later use
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({ message: 'Server error during token verification.' });
  }
};

module.exports = { verifyAdmin };
