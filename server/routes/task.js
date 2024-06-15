var express = require('express');
var router = express.Router();
var taskController = require('../controller/taskController');
const verify = require('../config/verifyToken');


router.get('/', verify , taskController.getAllTask);
router.post('/', taskController.createTask);
router.delete('/', taskController.deleteTask);
router.put('/', taskController.updateTask);

module.exports = router;
