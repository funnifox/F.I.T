const express = require('express');
const router = express.Router();
const pool = require('../services/db');



//USER:1
module.exports.insertSingle = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO users (username, email, password, created_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP);
    `;

    const VALUES = [data.username, data.email, data.password];
    console.log("USER modl:",1)
    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.dupeCheckerinator = (data, callback)=> {
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM users WHERE username = ?;
    `;
    const VALUES = [data.username];
    console.log(`checking for dupes`)
    pool.query(SQLSTATEMENT, VALUES, callback);
}   


