const model = require("../models/workoutModel");
module.exports.theEmptyVoid = (req, res, next) => {
    const callback = () => {
            console.log('\n\n\n\n\n\n');
            next();
        }
    callback();
};

//WORKOUT:1
// create a workout
module.exports.createNewWorkout = (req, res, next) =>{
    console.log("WORKOUT",1,"cont:createNewWorkout")
    if(req.body.token == (undefined||null)
     ||req.body.token.trim() === ""
     ||req.body.user_id == (undefined||null)
    )
    {
        res.status(400).send("Error: invalid request body");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        token: req.body.token
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewWorkout:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json();
        }
    }

    model.insertSingle(data, callback);
}


//WORKOUT:2
// delete a workout
module.exports.deleteWorkout = (req, res, next) =>{
    console.log("WORKOUT",2,"cont:deleteWorkout")
    if(req.body.token == (undefined||null)
     ||req.body.token.trim() === ""
     ||req.body.user_id == (undefined||null)
    )
    {
        res.status(400).send("Error: invalid request body");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        token: req.body.token
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteWorkout:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json();
        }
    }

    model.deleteWorkout(data, callback);
}
