// const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';

// const generateToken = (user) => {
//     return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
// };

// const verifyToken = (token) => {
//     return jwt.verify(token, secret);
// };

// module.exports = { generateToken, verifyToken };

const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user.user_id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
