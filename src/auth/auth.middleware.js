const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  // Extract the token after the "Bearer " prefix
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key in your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user payload to the request
    next(); // Pass control to the next function (the controller)
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = { verifyToken };