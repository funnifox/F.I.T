const express = require('express');
const router = express.Router();
const pool = require('../services/db');



//WORKOUT:1
// create a workout
module.exports.insertSingle = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO workouts (user_id, token)
    VALUES (?, ?);
    `;

    const VALUES = [data.user_id, data.token];
    console.log("WORKOUT",1,"modl:insertSingle")
    pool.query(SQLSTATEMENT, VALUES, callback);
}


// delete a workout
module.exports.deleteWorkout = (data, callback) =>{
    const SQLSTATEMENT = `
    DELETE FROM workouts
    WHERE user_id = ? AND token = ?;
    `;

    const VALUES = [data.user_id, data.token];
    console.log("WORKOUT",2,"modl:deleteWorkout")
    pool.query(SQLSTATEMENT, VALUES, callback);
}

