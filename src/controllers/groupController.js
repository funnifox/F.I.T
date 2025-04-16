const model = require("../models/groupModel");
module.exports.theEmptyVoid = (req, res, next) => {
    const callback = () => {
            console.log('\n\n\n\n\n\n');
            next();
        }
    callback();
};


// GROUP:1
// create a group
module.exports.createGrpAuth = (req, res, next) =>{
    console.log("GROUP",1,"cont:createGrpAuth")

    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createGrpAuth:", error);
            res.status(500).json(error);
        } else {
            switch(true) {
            case (results[0].count == 0):
                console.log("createGrpAuth passed")
                next()
            break;
            default:
                console.log(`Error: User is the creator of another group and thus cannot create another group`)
                res.status(403).json({message: "User is the creator of another group and thus cannot create another group"});
            }
        }
    }

    model.createGrpAuth(data, callback);
}
module.exports.createNewGroup = (req, res, next) =>{
    console.log("GROUP",1,"cont:createNewGroup")

    const data = {
        user_id: req.params.user_id,
        groupname: req.body.groupname
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewGroup:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({message:"Group "+data.groupname+" successfully created"});
        }
    }

    model.createNewGroup(data, callback);
}


// GROUP:2
// delete a group
module.exports.deleteGrpById = (req, res, next) =>{
    console.log("GROUP",2,"cont:deleteGrpById")
    const data = {
        groupname: req.params.groupname
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteGrpById:", error);
            res.status(500).json(error);
        } else {
        switch(true) {
            case (results.affectedRows == 0):
                console.log(`Error: group not found`)
                res.status(404).json({message: "group not found"});
            break;
            default:
                res.status(204).send(); // 204 No Content      
            }
        }
    }

    model.deleteById(data, callback);
};


// USER:3
// get an account's info
module.exports.readUserById = (req, res, next) =>{
    console.log("-- running readUserById")
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
                console.log("USER",3,"cont:readUserById")
                res.status(200).send(results); // 204 No Content      
            }
        }
    }
    model.selectUserById(data, callback);
}









// checks
module.exports.dupeCheckerinator = (req, res, next) => {
    console.log(`-- running dupecheckinator [group edition]`)
    if(req.body.groupname == undefined|| req.body.groupname.trim() === "")
        {
            res.status(400).send("Error: groupname is undefined");
            return;
        }

    const data = {
        groupname: req.body.groupname
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error: dupeCheckerinator", error);
            res.status(500).json(error);
            return;
        } else {
        switch(true) {
            case (results[0].count > 0):
                console.log(`Error: groupname is taken`)
                res.status(409).send("Error: groupname is taken");
                break;
            default:
                console.log(`no dupes found`)
                next();
            }
        }
    };

    model.dupeCheckerinator(data, callback);
};
module.exports.chkUserExist = (req, res, next) => {
    console.log(`-- running chkUserExist`)
    if(req.params.user_id == (undefined||null))
        {
            res.status(400).send("Error: user_id parameter missing");
            return;
        }

    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error: chkUserExist", error);
            res.status(500).json(error);
            return;
        } else {
        switch(true) {
            case (results[0].count == 0):
                console.log(`Error: user_id does not exist`)
                res.status(409).send("Error: user_id does not exist");
                break;
            default:
                console.log(`user_id existence comfirmed`)
                next();
            }
        }
    };

    model.chkUserExist(data, callback);
};
module.exports.groupDelAuth = (req, res, next) => {
    console.log(`-- running groupDelAuth`)
    if(req.params.groupname == undefined|| 
       req.params.groupname.trim() === ""||
       req.params.user_id == undefined)
        {
            res.status(400).send("Error: groupname or user_id undefined");
            return;
        }

    const data = {
        user_id: req.params.user_id,
        groupname: req.params.groupname
    };

    const callback = (error, results) => {
        if (error) {
            console.error("Error: groupDelAuth", error);
            res.status(500).json(error);
            return;
        } else {
        switch(true) {
            case (results[1][0].count > 0):
                console.log(`groupDelAuth passed`)
                next();
                break;
            case (results[0][0].count == 0):
                console.log(`group does not exist. Please check your spelling`)
                next();
                break;
            default:
                console.log(`Error: user is not authorised to delete this group`)
                res.status(409).send("Error: user is not authorised to delete this group");
                break;
            }
        }
    };

    model.groupDelAuth(data, callback);
};
