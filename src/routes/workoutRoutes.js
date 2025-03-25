const express = require('express');
const router = express.Router();

const controller = require('../controllers/workoutController.js');

// WORKOUT:1
// create a workout
router.post('/', controller.theEmptyVoid, controller.createNewWorkout);


// WORKOUT:2
// delete a workout
router.post('/', controller.theEmptyVoid, controller.deleteWorkout);




module.exports = router;