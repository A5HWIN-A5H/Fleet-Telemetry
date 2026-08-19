const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  // In a real production environment, you would verify this against a User database
  if (username === 'fleet_admin' && password === 'securepassword123') {
    // Issue a token valid for 1 hour
    const token = jwt.sign(
      { role: 'operator', operatorId: 'op-001' }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    return res.status(200).json({ message: 'Login successful', token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};

module.exports = { login };