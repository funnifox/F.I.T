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
module.exports.selectUserInfoById = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT ${data.userInfo} FROM users
    WHERE username = ?;
    `;

    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
} 
module.exports.getUserpassword = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT password FROM users
    WHERE username = ?;
    `;

    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
} 


// USER:3
module.exports.patchUserInfo = (data, callback) =>{
    const SQLSTATEMENT = `
    UPDATE users
    SET ${data.userInfo} = '${data.changed}'
    WHERE username = ?;
    `;

    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
} 


// USER:5
module.exports.description = (data, callback) =>{
    const SQLSTATEMENT = `
    UPDATE users
    SET description = ?
    WHERE username = ?;
    `;

    const VALUES = [data.description, data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
} 

// USER:6
module.exports.getDesc = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT description FROM users
    WHERE username = ?;
    `;

    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
} 


// checks
module.exports.chkUserExist = (data, callback)=> {
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM users WHERE username = ?;
    `;

    const VALUES = [data.username];
    pool.query(SQLSTATEMENT, VALUES, callback);
}   
