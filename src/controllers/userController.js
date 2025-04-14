const bcrypt = require('../userAdmn/brcypt');
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
// gat user info using username
module.exports.requireAuth = (req, res, next) =>{
    console.log(`==================================`)
    console.log("running requirePassword")
    if(req.params.userInfo == (undefined||null)
     ||req.params.userInfo.trim() === ""
    ){
        res.status(400).send("Error: invalid request params");
        return;
    }

    const data = {
        userInfo: req.params.userInfo,
        username: req.params.username
    }
    console.log("userInfo: "+data.userInfo)

    const callback_nopassword = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if(res.locals.userExist == true){
                res.status(200).send(results); 
            }else{
                res.status(404).send("Error: user not found"); 
            }
        }
    }
    const callback_yespassword = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if(res.locals.userExist == true){
                console.log('getting hashed password from database')
                res.locals.dbPassword = results[0].password
                next()
            }else{
                res.status(404).send("Error: user not found"); 
            }
        }
    }

    
    if(data.userInfo==""){
        console.log("requirePassword: no")
        model.selectUserInfoById(data, callback_nopassword);
    }else{
        console.log("requirePassword: yes")
        model.getUserpassword(data, callback_yespassword);
    }
};
module.exports.getUserInfo = (req, res, next) =>{
    console.log(`==================================`)
    console.log("running getUserInfo")
    if(req.params.userInfo == (undefined||null)
     ||req.params.userInfo.trim() === ""
     ||req.params.username == (undefined||null)
     ||req.params.username.trim() === ""
    ){
        res.status(400).send("Error: invalid request params");
        return;
    }

    const data = {
        userInfo: req.params.userInfo,
        username: req.params.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if(res.locals.userExist == true){
                res.status(200).send(results); 
            }else{
                res.status(404).send("Error: user not found"); 
            }
        }
    }
    
        model.selectUserInfoById(data, callback);
};


// USER:3
// get an account's info
module.exports.patchUserInfo = (req, res, next) =>{
    console.log(`==================================`)
    console.log("running patchUserInfo")
    if(req.params.userInfo == (undefined||null)
     ||req.params.userInfo.trim() === ""
     ||req.params.username == (undefined||null)
     ||req.params.username.trim() === ""
    ){
        res.status(400).send("Error: invalid request params");
        return;
    }

    const data = {
        userInfo: req.params.userInfo,
        username: req.params.username,
        userInfo: req.params.userInfo,
        changed: req.body.changed
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
        } else {
            if(res.locals.userExist == true){
                res.status(200).send(results); 
            }else{
                res.status(404).send("Error: user not found"); 
            }
        }
    }
    
        model.patchUserInfo(data, callback);
};








// checks

// this one outputs userExist as a true or false value, does not pass any error handling
module.exports.chkUserExist = (req, res, next) => {
    console.log(`==================================`)
    console.log(`running chkUserExist`)
    if(req.params.username == undefined||req.params.username.trim() === "")
        {
            res.status(400).send("Error: username is undefined");
            return;
        }

    const data = {
        username: req.params.username
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error: chkUserExist", error);
            res.status(500).json(error);
            return;
        } else {
            console.log(`user: ${data.username}`)
            console.log(results[0])
            if (results[0].count >= 1){
                res.locals.userExist = true
            }else{
            res.locals.userExist = false
        }
            console.log('userExist: '+res.locals.userExist)
            next()
        }
    };

    model.chkUserExist(data, callback);
};

