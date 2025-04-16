const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController.js');
const bcrypt = require('../userAdmn/brcypt.js');

// USER:1 has been moved to useradmn

// USER:2 get user info using username
let auth = [controller.chkUserExist, controller.requireAuth, bcrypt.comparePassword]
router.post('/:username/:userInfo',controller.theEmptyVoid, auth, controller.getUserInfo);
// (this is post bc it needs to have a req body)

// USER:3 patch user info using username
router.patch('/:username/:userInfo',controller.theEmptyVoid, auth, controller.patchUserInfo, bcrypt.hashPassword, controller.patchUserInfo);

// USER:4 check user existence
router.get('/:username',controller.theEmptyVoid, controller.chkUserExist, controller.allowRename);

module.exports = router;









// TODO LIST
// - add profile pic option (another midlware???) bknd
// - add profile pic frntnd
// - add user desc. bknd
// - add user desc. frntnd