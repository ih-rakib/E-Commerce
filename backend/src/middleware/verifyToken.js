const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log("Received Token:", token); // Debug: Check token value

        // const token = req.headers["authorization"].split(" ")[1]

        if (!token) {
            return res.status(401).send({ message: "No token provided!" });
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY);
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
