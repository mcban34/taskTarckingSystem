var express = require('express');
var router = express.Router();
var taskController = require('../controller/taskController');
const verify = require('../config/verifyToken');


router.get('/', verify, taskController.getAllTask);
router.post('/', verify, taskController.createTask);
router.delete('/', verify, taskController.deleteTask);
router.put('/', verify, taskController.updateTask);

module.exports = router;
