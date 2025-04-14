const bcrypt = require("bcrypt");

// ====================================================
// SET SALT ROUNDS
// ====================================================
const saltRounds = 10;


// ====================================================
// MIDDLEWARE FUNCTION FOR HASHING PASSWORD
// ====================================================
module.exports.hashPassword = (req, res, next) => {
    console.log(`==================================`)
    console.log(`runnung hashPassword`)
    const callback = (err, hash) => {
        if (err) {
        console.error("Error bcrypt:", err);
        res.status(500).json(err);
        } else {
        res.locals.hash = hash;
        console.log('password hashed successfully')
        next();
        }
    };
  
    bcrypt.hash(req.body.password, saltRounds, callback);
};


// ====================================================
// MIDDLEWARE FUNCTION FOR COMPARING PASSWORD
// ====================================================
module.exports.comparePassword = (req, res, next) => {
    // Check password
    console.log(`==================================`)
    console.log(`running comparePassword`)
    const callback = (err, isMatch) => {
        if (err) {
        console.error("Error bcrypt:", err);
        res.status(500).json(err);
        } else {
        if (isMatch) {
            console.log(`password is correct`)
            next(); 
        } else {
            console.log(`password is incorrect`)
            res.status(401).json({
            message: "Wrong password",
            });
        }
        }
    };
    bcrypt.compare(req.body.password, res.locals.dbPassword, callback);
};
