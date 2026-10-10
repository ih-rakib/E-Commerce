const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    try {
        let token = req.cookies?.token;

        // Fallback to Authorization: Bearer <token> for non-cookie clients
        if (!token) {
            const authHeader = req.headers["authorization"] || req.headers["Authorization"];
            if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
                token = authHeader.slice(7);
            }
        }

        if (!token) {
            return res.status(401).send({ message: "No token provided!" });
        }

        const decoded = jwt.verify(token, getJwtSecret());
        // console.log("Decoded Token:", decoded); 

        // Ensure decoded token has required properties
        if (!decoded || !decoded.userId || !decoded.role) {
            return res.status(401).send({ message: "Invalid token structure!" });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ message: "Token expired!" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ message: "Invalid token!" });
        }
        console.error("JWT verification error:", error);
        res.status(401).send({ message: "Token verification failed!" });
    }
}

module.exports = verifyToken;
