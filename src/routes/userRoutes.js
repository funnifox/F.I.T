const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController.js');

// USER:1 has been moved to useradmn

// USER:2
// delete an account
router.delete('/:user_id/:password', controller.theEmptyVoid, controller.pswdAuth, controller.deleteUserById);

// USER:3
// get an account's info
router.get('/:user_id', controller.theEmptyVoid, controller.readUserById);




module.exports = router;