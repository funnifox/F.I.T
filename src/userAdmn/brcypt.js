const bcrypt = require("bcrypt");

// \n==========================================================
// SET SALT ROUNDS
// \n==========================================================
const saltRounds = 10;


// \n==========================================================
// MIDDLEWARE FUNCTION FOR HASHING PASSWORD
// \n==========================================================
module.exports.hashPassword = (req, res, next) => {
    console.log(`\n========================================`)
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


// \n==========================================================
// MIDDLEWARE FUNCTION FOR COMPARING PASSWORD
// \n==========================================================
module.exports.comparePassword = (req, res, next) => {
    // Check password
    console.log(`\n========================================`)
    console.log(`-- running comparePassword`)
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
