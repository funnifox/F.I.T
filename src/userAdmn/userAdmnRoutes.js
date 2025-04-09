const express = require('express');
const router = express.Router();

const controller = require('../userAdmn/userAdmnController');
const bcrypt = require('../userAdmn/brcypt');
const jwt = require('../userAdmn/jwt');


// USER:1
// create an account
router.post("/register",controller.theEmptyVoid, controller.checkUsernameOrEmailExist, bcrypt.hashPassword, controller.register, jwt.generateToken, jwt.sendToken);


router.post("/login",controller.theEmptyVoid, controller.login, bcrypt.hashPassword, bcrypt.comparePassword, jwt.generateToken, jwt.sendToken);


module.exports = router;