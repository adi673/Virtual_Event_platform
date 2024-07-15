const { verifyToken } = require('../utils/jwtUtils');

const authMiddleware = (req, res, next) => {
    var token = req.cookies.token;
    //fix this not gettting token from cookies
    
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }
    token = authHeader.split(' ')[1]; // Bearer <token>
    
    
    console.log(token)
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
