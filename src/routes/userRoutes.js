const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController.js');

// USER:1
router.post('/', controller.theEmptyVoid, controller.dupeCheckerinator, controller.createNewUser);



module.exports = router;