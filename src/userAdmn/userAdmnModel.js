const pool = require('../services/db');


// ===================================================
// SELECT ALL PLAYERS BY USER
// ===================================================
module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
        SELECT * FROM users;
    `;
    pool.query(SQLSTATEMENT, callback);
}

// ===================================================
// SELECT USER BY USERNAME
// ===================================================
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
    

// ===================================================
// SELECT USER BY USERNAME OR EMAIL
// ===================================================
module.exports.checkUsernameOrEmailExist = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT COUNT(*) AS count FROM users
        WHERE username = ? OR email = ?;
    `;

    const VALUES = [data.username, data.email]
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ===================================================
// INSERT NEW USER (USERNAME, EMAIL)
// ===================================================
module.exports.insertNewUser = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;

    const VALUES = [data.username, data.email, data.password]
    pool.query(SQLSTATEMENT, VALUES, callback);
}


