const model = require("../models/userModel");
module.exports.theEmptyVoid = (req, res, next) => {
    const callback = () => {
            console.log('\n\n\n\n\n\n');
            next();
        }
    callback();
};









// USER:1
module.exports.createNewUser = (req, res, next) =>
{
    if(req.body.username == undefined)
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
            res.status(201).json({"message":"Please login using new the credentials"});
        }
    }

    console.log("USER cont:",1)
    model.insertSingle(data, callback);
}
module.exports.dupeCheckerinator = (req, res, next) => 
{
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
            console.error("Error: dupeCheckerinator is not working for some reason", error);
            res.status(500).json(error);
            return;
        }
        if (results[0].count > 0) {
            res.status(409).send("Error: username is taken");
        } else {
            console.log(`no dupes found`)
            next(); 
        }
    };

    model.dupeCheckerinator(data, callback);
};




