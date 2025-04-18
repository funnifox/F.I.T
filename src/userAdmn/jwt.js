require("dotenv").config();
const jwt = require("jsonwebtoken");

// \n==========================================================
// SET JWT CONFIGURATION
// \n==========================================================
const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

// \n==========================================================
// MIDDLEWARE FUNCTION FOR GENERATING JWT TOKEN
// \n==========================================================
module.exports.generateToken = (req, res, next) => {
    console.log(`generateToken jwt`)

    const payload = {
        user_id: res.locals.user_id,
        timestamp: new Date()
    };
  
    const options = {
        algorithm: tokenAlgorithm,
        expiresIn: tokenDuration,
    };
  
    const callback = (err, token) => {
        if (err) {
            console.error("Error jwt:", err);
            res.status(500).json(err);
        } else {
            res.locals.token = token;
            next();
        }
    };
  
    const token = jwt.sign(payload, secretKey, options, callback);
};

// \n==========================================================
// MIDDLEWARE FUNCTION FOR SENDING JWT TOKEN
// \n==========================================================
module.exports.sendToken = (req, res, next) => {
    res.status(200).json({
        message: res.locals.message,
        token: res.locals.token,
    });
};

// \n==========================================================
// MIDDLEWARE FUNCTION FOR VERIFYING JWT TOKEN
// \n==========================================================
module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
  
    const token = authHeader.substring(7);
  
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
  
    const callback = (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: "Invalid token" });
        }

        res.locals.user_id = decoded.user_id;
        res.locals.tokenTimestamp = decoded.timestamp;

        next();
    };
  
    jwt.verify(token, secretKey, callback);
};