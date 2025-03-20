const model = require("../models/userModel");
module.exports.theEmptyVoid = (req, res, next) => {
    const callback = () => {
            console.log('\n\n\n\n\n\n');
            next();
        }
    callback();
};


// USER:1
// create an account
module.exports.createNewUser = (req, res, next) =>{
    console.log("USER",1,"cont:createNewUser")
    if(req.body.username == (undefined||null)
     ||req.body.username.trim() === ""
     ||req.body.email == (undefined||null)
     ||req.body.email.trim() === ""
     ||req.body.password == (undefined||null)
     ||req.body.password.trim() === ""
    )
    {
        res.status(400).send("Error: invalid request body");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({message:"Please login using new the credentials"});
        }
    }

    model.insertSingle(data, callback);
}


// USER:2
// delete an account
module.exports.deleteUserById = (req, res, next) =>{
    console.log("USER",2,"cont:deleteUserById")
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            res.status(204).send(); // 204 No Content      
        }
    }

    model.deleteById(data, callback);
};


// USER:3
// get an account's info
module.exports.readUserById = (req, res, next) =>{
    console.log("USER",3,"cont:readUserById")
    if(req.params.user_id == (undefined||null))
       {
           res.status(400).send("Error: invalid request params");
           return;
       }
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
        switch(true) {
            case (results.affectedRows == 0):
                console.log(`Error: user not found`)
                res.status(404).json({message: "User not found"});
            break;
            default:
                res.status(200).send(results); // 204 No Content      
            }
        }
    }
    model.selectUserById(data, callback);
}









// checks
module.exports.dupeCheckerinator = (req, res, next) => {
    console.log(`running dupecheckinator`)
    if(req.body.username == undefined|| req.body.username.trim() === "")
        {
            res.status(400).send("Error: username is undefined");
            return;
        }

    const data = {
        username: req.body.username
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error: dupeCheckerinator", error);
            res.status(500).json(error);
            return;
        } else {
        switch(true) {
            case (results[0].count > 0):
                console.log(`Error: username is taken`)
                res.status(409).send("Error: username is taken");
                break;
            default:
                console.log(`no dupes found`)
                next();
            }
        }
    };

    model.dupeCheckerinator(data, callback);
};
module.exports.pswdAuth = (req, res, next) =>{
    console.log("running pswdAuth")
    if(req.params.password == (undefined||null)
     ||req.params.password.trim() === ""
     ||req.params.user_id == (undefined||null)
    )
    {
        res.status(400).send("Error: invalid request params");
        return;
    }


    const data = {
        user_id: req.params.user_id,
        password: req.params.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error auth:", error);
            res.status(500).json(error);
        } else {
        switch(true) {
            case (results[0][0].count == 0):
                res.status(404).send(`user_id not found`)
                break;
            case (error):
                console.error("Error: auth", error);
                res.status(500).json(error);
                break;
            case (results[1][0].count == 0):
                res.status(404).send(`incorrect password. please try again`)
                break;
            default:
                console.log("auth passed")
                next();
            }
        }
    }

    model.pswdAuth(data, callback);
};