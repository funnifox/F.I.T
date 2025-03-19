const express = require('express');
const router = express.Router();

// user 
const userRoutes = require('./userRoutes');
router.use("/users", userRoutes);






// ==============================
// Note to future self*
// Hello there. If you're reading this,
// you can copy paste userAdmn require and router.use
// as long as you have the userAdmn folder in the src folder
// 
// Happy coding, don't die
// ==============================


// userAdmn
const userAdmn = require('../userAdmn/userAdmnRoutes');
router.use("/userAdmn", userAdmn);





module.exports = router;