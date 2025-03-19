const model = require("../userAdmn/userAdmnModel");


module.exports.theEmptyVoid = (req, res, next) => {
    const callback = () => {
            console.log('\n\n\n\n\n\n');
            next();
        }
    callback();
};



// ====================================================
// CONTROLLER FOR LOGIN
// ====================================================
module.exports.login = (req, res, next) => {
    switch(true){
        case (req.body.username == undefined|| req.body.username.trim() === ""):
            res.status(400).send("Error: username is undefined")
            return;
        case (req.body.password == undefined|| req.body.password.trim() === ""):
            res.status(400).send("Error: password is undefined")
            return;
        default:
            break;
    }

    const data = {
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error in login:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.log(`login controller`)
            console.log(`Checking for user`)
            if (results[0] == undefined) {
                console.log(`user not found`)
                res.status(404).json({message:`User not found`})
                return;
            } else {
                console.log(`user found`)
                res.locals.user_id = results[0].user_id
                res.locals.username = req.body.username
                res.locals.password = results[0].password

                next(); 
            }   
        }
    };

    model.checkUsernameExist(data, callback);
};




// ====================================================
// CONTROLLER FOR REGISTER
// ====================================================
module.exports.register = (req, res, next) => {
    switch(true){
        case (req.body.username == undefined|| req.body.username.trim() === ""):
            res.status(400).send("Error: username is undefined")
            return;
        case (req.body.email == undefined|| req.body.email.trim() === ""):
            res.status(400).send("Error: email is undefined")
            return;
        case (req.body.password == undefined|| req.body.password.trim() === ""):
            res.status(400).send("Error: password is undefined")
            return;
        default:
            break;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error in register:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
                res.locals.user_id = results.insertId
                res.locals.message = `User ${data.username} created successfully.`
                next(); 
            }
    };

    model.insertNewUser(data, callback);
};



// ====================================================
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
// ====================================================
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error in checkUsernameOrEmailExist:", error);
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.log(`Checking for dupes\n`, results)
            if (results[0].count > 0) {
                res.status(409).json({message:`Username or email already exists`});
            } else {
                console.log(`no dupes found`)
                next(); 
            }   
        }
    };

    model.checkUsernameOrEmailExist(data, callback);
};







// ====================================================
// EXAMPLE CONTROLLER FOR TOKEN PRE-GENERATION
// ====================================================
module.exports.preTokenGenerate = (req, res, next) => {
    res.locals.user_id = req.body.id;
    next();
}

// ====================================================
// EXAMPLE CONTROLLER FOR BEFORE SENDING TOKEN
// ====================================================
module.exports.beforeSendToken = (req, res, next) => {
    res.locals.message = `Token is generated.`;
    next();
}

// ====================================================
// EXAMPLE CONTROLLER FOR TOKEN VERIFICATION
// ====================================================
module.exports.showTokenVerified = (req, res, next) => {
    res.status(200).json({
        user_id: res.locals.user_id,
        message: "Token is verified."
    });
}

// ====================================================
// EXAMPLE CONTROLLER FOR BCRYPT COMPARE
// ====================================================
module.exports.showCompareSuccess = (req, res, next) => {
    res.status(200).json({
        message: "Compare is successful."
    });
}

// ====================================================
// EXAMPLE CONTROLLER FOR BCRYPT PRE-COMPARE
// ====================================================
module.exports.preCompare = (req, res, next) => {
    res.locals.hash = req.body.hash;
    next();
}

// ====================================================
// EXAMPLE CONTROLLER FOR BCRYPT HASHING
// ====================================================
module.exports.showHashing = (req, res, next) => {
    res.status(200).json({
        hash: res.locals.hash,
        message: `Hash is successful.`
    });
}