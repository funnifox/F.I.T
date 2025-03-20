const express = require('express');
const router = express.Router();
const pool = require('../services/db');



//GROUP:1
// create a group
module.exports.createGrpAuth = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM groups WHERE creator_id = ?;
    `;

    const VALUES = [data.user_id];
    console.log("GROUP",1,"modl:createGrpAuth")
    pool.query(SQLSTATEMENT, VALUES, callback);
}
module.exports.createNewGroup = (data, callback) =>{
    const SQLSTATEMENT = `
    INSERT INTO groups (groupname, creator_id, created_at)
    VALUES (?, ?, CURRENT_TIMESTAMP);
    `;

    const VALUES = [data.groupname, data.user_id];
    console.log("GROUP",1,"modl:createNewGroup")
    pool.query(SQLSTATEMENT, VALUES, callback);
}



// GROUP:2
// delete a group
module.exports.deleteById = (data, callback) =>{
    const SQLSTATEMENT = `
    DELETE FROM groups
    WHERE groupname = ?;
    `;

    const VALUES = [data.groupname];
    console.log("GROUP",2,"modl:deleteById")
    pool.query(SQLSTATEMENT, VALUES, callback);
} 


// GROUP:3
// get an account's info
module.exports.selectUserById = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT username, email, group_id, created_at FROM users
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];
    console.log("GROUP",3,"modl:selectUserById")
    pool.query(SQLSTATEMENT, VALUES, callback);
} 




// checks
module.exports.dupeCheckerinator = (data, callback)=> {
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM groups WHERE groupname = ?;
    `;

    const VALUES = [data.groupname];
    console.log(`checking for dupes`)
    pool.query(SQLSTATEMENT, VALUES, callback);
}   
module.exports.chkUserExist = (data, callback)=> {
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM users WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];
    console.log(`checking for user_id:`, data.user_id)
    pool.query(SQLSTATEMENT, VALUES, callback);
} 
module.exports.groupDelAuth = (data, callback) =>{
    const SQLSTATEMENT = `
    SELECT COUNT(*) AS count FROM groups WHERE groupname = ?;
    SELECT COUNT(*) AS count FROM groups WHERE creator_id = ? AND groupname = ?;
    `;

    const VALUES = [data.groupname, data.user_id, data.groupname];
    pool.query(SQLSTATEMENT, VALUES, callback);
} 