const secret = 'mysecretkey';
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user.user_id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
