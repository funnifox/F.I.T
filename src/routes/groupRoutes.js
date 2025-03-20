const express = require('express');
const router = express.Router();

const controller = require('../controllers/groupController.js');
const userController = require('../controllers/userController.js');

// GROUP:1
// create a group
router.post('/:user_id', controller.theEmptyVoid, controller.chkUserExist, controller.createGrpAuth, controller.dupeCheckerinator, controller.createNewGroup);

// GROUP:2
// delete a group
router.delete('/:groupname/:user_id/:password', controller.theEmptyVoid, controller.chkUserExist, userController.pswdAuth, controller.groupDelAuth, controller.deleteGrpById);

// GROUP:3
// get an account's info
router.get('/:user_id', controller.theEmptyVoid, controller.readUserById);




module.exports = router;