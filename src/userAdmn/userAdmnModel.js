const pool = require('../services/db');


// \n=========================================================
// SELECT ALL PLAYERS BY USER
// \n=========================================================
module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM users;
    `;
    pool.query(SQLSTATEMENT, callback);
}

// \n=========================================================
// SELECT USER BY USERNAME
// \n=========================================================
module.exports.checkUsernameExist = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM users
        WHERE username = ?;
    `;

    const VALUES = [data.username]
    console.log(`checkUsernameExist model`)
    pool.query(SQLSTATEMENT, VALUES, callback);
}
    

// \n=========================================================
// SELECT USER BY USERNAME OR EMAIL
// \n=========================================================
module.exports.checkUsernameOrEmailExist = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT COUNT(*) AS count FROM users
        WHERE username = ?
    `;

    const VALUES = [data.username]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// \n=========================================================
// INSERT NEW USER (USERNAME, EMAIL)
// \n=========================================================
module.exports.insertNewUser = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;

    const VALUES = [data.username, data.email, data.password]
    pool.query(SQLSTATEMENT, VALUES, callback);
}


