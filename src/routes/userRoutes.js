const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController.js');
const bcrypt = require('../userAdmn/brcypt.js');

// USER:1 has been moved to useradmn

// USER:2 get user info using username
router.post('/:username/:userInfo', controller.theEmptyVoid, controller.chkUserExist, controller.requireAuth, bcrypt.comparePassword, controller.getUserInfo);




module.exports = router;




// TODO LIST
// - USER:4 edit profile(only password and email require auth) bknd
// - USER:4 frntnd
// - add profile pic option (another midlware???) bknd
// - add profile pic frntnd
// - add user desc. bknd
// - add user desc. frntnd