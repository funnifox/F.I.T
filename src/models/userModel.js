const express = require('express');
const router = express.Router();
const pool = require('../services/db');



//USER:1
// create an account
module.exports.insertSingle = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO users (username, email, password, created_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP);
    `;

    const VALUES = [data.username, data.email, data.password];
    console.log("USER",1,"modl:insertSingle")
    pool.query(SQLSTATEMENT, VALUES, callback);
}



// USER:2
// delete an account
module.exports.deleteById = (data, callback) =>{
    const SQLSTATEMENT = `
    DELETE FROM users
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id ];
    console.log("USER",2,"modl:deleteById")
    pool.query(SQLSTATEMENT, VALUES, callback);
} 


// USER:3
// get an account's info
module.exports.selectUserById = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT username, email, group_id, created_at FROM users
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];
    console.log("USER",3,"modl:selectUserById")
    pool.query(SQLSTATEMENT, VALUES, callback);
} 




// checks
module.exports.dupeCheckerinator = (data, callback)=> {
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM users WHERE username = ?;
    `;

    const VALUES = [data.username];
    console.log(`checking for dupes`)
    pool.query(SQLSTATEMENT, VALUES, callback);
}   
module.exports.pswdAuth = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM users WHERE user_id = ?;
    SELECT COUNT(*) AS count FROM users WHERE user_id = ? AND password = ?;
    `;

    const VALUES = [data.user_id, data.user_id, data.password];
    pool.query(SQLSTATEMENT, VALUES, callback);
} 