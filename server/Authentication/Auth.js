const BlacklistedToken = require('../models/BlacklistedTokens');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth =async (req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Please Login' });
    }

    try {
        const blacklistedToken = await BlacklistedToken.findOne({ Token: token });
        if (blacklistedToken) {
            return res.status(401).json({ message: 'Please Login' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return res.status(200).json({ authenticated: true });

    }catch(error){
        // The jwt.verify method will throw an error if:
        // The token is expired (TokenExpiredError).
        // The token is invalid (like tampered or incorrect signature).

        // Error handling to distinguish between invalid and expired tokens
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired. Please login again.' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
}


module.exports = auth;
